# -*- coding: utf-8 -*-
"""FER_model.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1NN8nzX3Kyi2RIhi0m_KUYCs0BlDhg5mC
"""

import sys

from torch.nn.modules.activation import ReLU
sys.path.insert(1, '../')

import torch
import torch.nn as nn

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def conv_bn_relu(in_channels, out_channels, kernel_size=3, stride=1, padding=0):
    return nn.Sequential(
        nn.Conv2d(in_channels, out_channels, kernel_size=kernel_size, stride=stride, padding=padding, bias=False),
        nn.BatchNorm2d(out_channels),
        nn.ReLU(inplace=True)
    )

def SeparableConv2D(in_channels, out_channels, kernel=3):
    return nn.Sequential(
        nn.Conv2d(in_channels, in_channels, kernel_size=kernel, stride=1, groups=in_channels,padding=1, bias=False),
        nn.Conv2d(in_channels, out_channels, kernel_size=1, stride=1, bias=False)
    )

class ResidualXceptionBlock(nn.Module):
    def __init__(self, in_channels, out_channels, kernel=3):
        super(ResidualXceptionBlock, self).__init__()
        global device

        self.depthwise_conv1 = SeparableConv2D(in_channels, out_channels, kernel).to(device)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.relu1 = nn.ReLU(inplace=True)

        self.depthwise_conv2 = SeparableConv2D(out_channels, out_channels, kernel).to(device)
        self.bn2 = nn.BatchNorm2d(out_channels)

        self.maxpool = nn.MaxPool2d(kernel_size=3, stride=1, padding=1)
        self.residual_conv = nn.Conv2d(in_channels, out_channels, kernel_size=1, stride=1, padding=0, bias=False)
        self.residual_bn = nn.BatchNorm2d(out_channels)

    def forward(self, x):
        # residual branch
        residual = self.residual_conv(x)
        residual = self.residual_bn(residual)
        
        x = self.depthwise_conv1(x)
        x = self.bn1(x)
        x = self.relu1(x)

        x = self.depthwise_conv2(x)
        x = self.bn2(x)
        x = self.maxpool(x)
        return x + residual

class Mini_Xception(nn.Module):
    def __init__(self):
        super(Mini_Xception, self).__init__()

        self.conv1 = conv_bn_relu(1, 8, kernel_size=3, stride=1, padding=0)
        self.conv2 = conv_bn_relu(8, 8, kernel_size=3, stride=1, padding=0)
        self.residual_blocks = nn.ModuleList([
            ResidualXceptionBlock(8 , 16).to(device),
            ResidualXceptionBlock(16, 32).to(device),
            ResidualXceptionBlock(32, 64).to(device),
            ResidualXceptionBlock(64, 128).to(device)            
        ])
        self.conv3 = nn.Conv2d(128, 7, kernel_size=3, stride=1, padding=1)

        self.global_avg_pool = nn.AdaptiveAvgPool2d(1)

    def forward(self, x):
        
        x = self.conv1(x)
        x = self.conv2(x)

        for block in self.residual_blocks:
            x = block(x)

        x = self.conv3(x)
        x = self.global_avg_pool(x)

        return x

from torchvision.transforms.transforms import ToPILImage, RandomHorizontalFlip, Compose, ToTensor 
import numpy as np
import seaborn as sn
import matplotlib.pyplot as plt
import pandas as pd

def get_transforms():
    transform = Compose([ToPILImage(), RandomHorizontalFlip(0.5), ToTensor()])
    return transform

def visualize_confusion_matrix(confusion_matrix):
    df_cm = pd.DataFrame(confusion_matrix, range(7), range(7))
    sn.set(font_scale=1.1) # for label size
    sn.heatmap(df_cm, annot=True, annot_kws={"size": 16}) # font size
    plt.show()

def histogram_equalization(image):
    equalized = cv2.equalizeHist(image)
    return equalized

import argparse
import cv2
from torch.utils.data import Dataset, DataLoader
import torchvision.transforms.transforms as transforms
import pandas as pd
import os
import numpy as np
import torch

class FER2013(Dataset):
    def __init__(self, root='../data', mode = 'train', transform = None):
        
        self.root = root
        self.transform = transform
        assert mode in ['train', 'val', 'test']
        self.mode = mode

        self.csv_path = os.path.join(self.root, 'fer2013.csv')
        self.df = pd.read_csv(self.csv_path)
        # print(self.df)

        if self.mode == 'train':
            self.df = self.df[self.df['Usage'] == 'Training']
        elif self.mode == 'val':
            self.df = self.df[self.df['Usage'] == 'PrivateTest']
        else:
            self.df = self.df[self.df['Usage'] == 'PublicTest']

    def __getitem__(self, index: int):
        data_series = self.df.iloc[index]
        emotion = data_series['emotion']
        pixels  = data_series['pixels']

        # to numpy
        face = list(map(int, pixels.split(' ')))
        face = np.array(face).reshape(48,48).astype(np.uint8)

        if self.transform:
            face = histogram_equalization(face)
            # face = normalization(face)
            face = self.transform(face)
        return face, emotion

    def __len__(self) -> int:
        return self.df.index.size


def create_train_dataloader(root='../data', batch_size=64):
    dataset = FER2013(root, mode='train', transform= get_transforms())
    dataloader = DataLoader(dataset, batch_size, shuffle=True)
    return dataloader

def create_val_dataloader(root='../data', batch_size=2):
    dataset = FER2013(root, mode='val', transform=transforms.ToTensor())
    dataloader = DataLoader(dataset, batch_size, shuffle=False)
    return dataloader

def create_test_dataloader(root='../data', batch_size=1):
    dataset = FER2013(root, mode='test', transform=transforms.ToTensor())
    dataloader = DataLoader(dataset, batch_size, shuffle=False)
    return dataloader

from google.colab import drive
# drive.mount('/content/drive/GP')

import numpy as np 
import argparse, cv2
import logging
import time
import os
from tqdm import tqdm

import torch
import torch.nn as nn
import torch.optim
import torch.utils.tensorboard as tensorboard
import torch.backends.cudnn as cudnn
cudnn.benchmark = True
cudnn.enabled = True

from sklearn.metrics import precision_score, recall_score, accuracy_score, confusion_matrix


# tensorboardd = 
# logging.basicConfig(
# format='[%(message)s',
# level=logging.INFO,
# handlers=[logging.FileHandler(logdir, mode='w'), logging.StreamHandler()])
# tensorboard
# writer = tensorboard.SummaryWriter(tensorboardd)
# ======================================================================

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def main():
    epochs = 300
    batch_size =15
    lr = 0.001
    weight_decay = 1e-6
    datapath = ''
    savepath = '/zft'
    savefreq = 1
    lr_patience = 40
    # tensorboardd = 'checkpoint/tensorboard'
    
    # ========= dataloaders ===========
    train_dataloader = create_train_dataloader(root=datapath, batch_size=batch_size)
    test_dataloader = create_val_dataloader(root=datapath, batch_size=batch_size)
    val_dataloader = create_test_dataloader(root=datapath, batch_size=batch_size)
    start_epoch = 0
    # ======== models & loss ========== 
    mini_xception = Mini_Xception()
    loss = nn.CrossEntropyLoss()
    # ========= load weights ===========
    if True:
        print("******************* Start training from scratch *******************\n")
        time.sleep(2)

    optimizer = torch.optim.Adam(mini_xception.parameters(), lr=lr, weight_decay=weight_decay)
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', patience=lr_patience, verbose=True)
    # ========================================================================
    for epoch in range(start_epoch, epochs):
        # =========== train / validate ===========
        train_loss = train_one_epoch(mini_xception, loss, optimizer, train_dataloader, epoch)
        val_loss, accuracy, percision, recall = validate(mini_xception, loss, test_dataloader, epoch)
        scheduler.step(val_loss)
        val_loss, accuracy, percision, recall = round(val_loss,3), round(accuracy,3), round(percision,3), round(recall,3)
        print(f"\ttraining epoch={epoch} .. train_loss={train_loss}")
        print(f"\tvalidation epoch={epoch} .. val_loss={val_loss}")
        print(f'\tAccuracy = {accuracy*100} % .. Percision = {percision*100} % .. Recall = {recall*100} % \n')
        time.sleep(2)
        # ============== save model =============
        if epoch % savefreq == 0:
            checkpoint_state = {
                'mini_xception': mini_xception.state_dict(),
                "epoch": epoch
            }
            savepath = os.path.join(savepath, f'weights_epoch_{epoch}.pth.tar')
            torch.save(checkpoint_state, savepath)
            print(f'\n\t*** Saved checkpoint in {savepath} ***\n')
            time.sleep(2)
            savepath = '/content/drive/GP/zft'
    writer.close()

def train_one_epoch(model, criterion, optimizer, dataloader, epoch):
    model.train()
    model.to(device)
    losses = []

    for images, labels in tqdm(dataloader):

        images = images.to(device) # (batch, 1, 48, 48)
        labels = labels.to(device) # (batch,)
        
        emotions = model(images)
        emotions = torch.squeeze(emotions)

        loss = criterion(emotions, labels)
        losses.append(loss.cpu().item())
        print(f'training @ epoch {epoch} .. loss = {round(loss.item(),3)}')

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
    return round(np.mean(losses).item(),3)


def validate(model, criterion, dataloader, epoch):
    model.eval()
    model.to(device)
    losses = []

    total_pred = []
    total_labels = []

    with torch.no_grad():
        for images, labels in tqdm(dataloader):
            mini_batch = images.shape[0]
            images = images.to(device)
            labels = labels.to(device)

            emotions = model(images)
            emotions = torch.squeeze(emotions)
            emotions = emotions.reshape(mini_batch, -1)

            loss = criterion(emotions, labels)            
            losses.append(loss.cpu().item())

            # # ============== Evaluation ===============
            # index of the max value of each sample (shape = (batch,))
            _, indexes = torch.max(emotions, axis=1)
            # print(indexes.shape, labels.shape)
            total_pred.extend(indexes.cpu().detach().numpy())
            total_labels.extend(labels.cpu().detach().numpy())

            print(f'validation loss = {round(loss.item(),3)}')

        val_loss = np.mean(losses).item()
        percision = precision_score(total_labels, total_pred, average='macro')
        recall = recall_score(total_labels, total_pred, average='macro')
        accuracy = accuracy_score(total_labels, total_pred)

        val_loss, accuracy, percision, recall = round(val_loss,3), round(accuracy,3), round(percision,3), round(recall,3)    
        print(f'Val loss = {val_loss} .. Accuracy = {accuracy} .. Percision = {percision} .. Recall = {recall}')

        if True:
            conf_matrix = confusion_matrix(total_labels, total_pred, normalize='true')
            print('Confusion Matrix\n', conf_matrix)
            visualize_confusion_matrix(conf_matrix)

        return val_loss, accuracy, percision, recall

main()

pip install tensorboardX

mini_xception = Mini_Xception()
    mini_xception.to(device)
    mini_xception.eval()

    checkpoint = torch.load('/content/drive/GP/zft/weights_epoch_75.pth.tar', map_location=device)
    mini_xception.load_state_dict(checkpoint['mini_xception'], strict=False)


    
    with torch.no_grad():
        for face, labels in tqdm(val_dataloader):
            temp_face = face.squeeze().numpy()

            face = face.to(device)
            face = torch.unsqueeze(face, 0)
            emotion = mini_xception(face)
            _, emotion = torch.max(emotion, axis=1)

            temp_face = cv2.resize(temp_face, (200,200))
            cv2.putText(temp_face, get_label_emotion(emotion.squeeze().cpu().item()), (0,20), cv2.FONT_HERSHEY_COMPLEX, 1, (255,255,255))
            cv2.putText(temp_face, get_label_emotion(label.item()), (110,190), cv2.FONT_HERSHEY_COMPLEX, 1, (0,0,0))
            cv2.imshow('face', temp_face)