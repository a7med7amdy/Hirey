from flask import Flask, request, jsonify, render_template
import torch
from os import listdir
from matplotlib import image
import matplotlib.pyplot as plt
import torch
from torchvision import datasets, transforms
import torch.nn as nn
import torch.nn.functional as F
import argparse
import numpy  as np
from PIL import Image
import torchvision
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset, random_split
from torch.utils.data.sampler import SubsetRandomSampler
from sklearn.model_selection import train_test_split
import numpy as np
import skimage
from skimage import data
import matplotlib.pyplot as plt  
import cv2

import os

class Deep_Emotion(nn.Module):
    def __init__(self):
        super(Deep_Emotion, self).__init__()
        self.conv1 = nn.Conv2d(1, 10, kernel_size=5)
        self.conv2 = nn.Conv2d(10, 20, kernel_size=5)
        self.conv2_drop = nn.Dropout2d()
        self.fc1 = nn.Linear(320, 50)
        self.fc2 = nn.Linear(50, 8)

        # Spatial transformer localization-network
        self.localization = nn.Sequential(
            nn.Conv2d(1, 8, kernel_size=7),
            nn.MaxPool2d(2, stride=2),
            nn.ReLU(True),
            nn.Conv2d(8, 10, kernel_size=5),
            nn.MaxPool2d(2, stride=2),
            nn.ReLU(True)
        )

        # Regressor for the 3 * 2 affine matrix
        self.fc_loc = nn.Sequential(
            nn.Linear(10 * 3 * 3, 32),
            nn.ReLU(True),
            nn.Linear(32, 3 * 2)
        )

        # Initialize the weights/bias with identity transformation
        self.fc_loc[2].weight.data.zero_()
        self.fc_loc[2].bias.data.copy_(torch.tensor([1, 0, 0, 0, 1, 0], dtype=torch.float))

    # Spatial transformer network forward function
    def stn(self, x):
        xs = self.localization(x)
        xs = xs.view(-1, 10 * 3 * 3)
        theta = self.fc_loc(xs)
        theta = theta.view(-1, 2, 3)

        grid = F.affine_grid(theta, x.size())
        x = F.grid_sample(x, grid)

        return x

    def forward(self, x):
        # transform the input
        x = self.stn(x)

        # Perform the usual forward pass
        x = F.relu(F.max_pool2d(self.conv1(x), 2))
        x = F.relu(F.max_pool2d(self.conv2_drop(self.conv2(x)), 2))
        x = x.view(-1, 320)
        x = F.relu(self.fc1(x))
        x = F.dropout(x, training=self.training)
        x = self.fc2(x)
        return x
        
device = "cpu"
def funfac(img):
    transformation= transforms.Compose([transforms.ToTensor()])

    net = Deep_Emotion()
    net.load_state_dict(torch.load('deep_emotion_CK+neutral-30.30-100-64-0.005-91%.pt'))
    net.to(device)
    net.eval()
    #Model Evaluation on test data
    classes = ('Angry','contempt' ,'Disgust', 'Fear', 'Happy', 'neutral','Sad', 'Surprise')

    # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # cv2.rectangle(img, (x,y), (x+w, y+h), (255,0,0), 2)
    resize_frame = cv2.resize(img, (28, 28))
    plt.imshow(resize_frame)
    plt.show()
    X = resize_frame/256
    X = Image.fromarray((X))
    X = transformation(X).unsqueeze(0)
    
    with torch.no_grad():

        imj = X.to(device)
        out = net(imj)
        pred = F.softmax(out,dim=1)
        classs = torch.argmax(pred,1)

        prediction = classes[classs.item()]
        print(prediction)
    return prediction
    
    
#!pip install flask-ngrok
from flask import Flask
from flask import request
from flask_ngrok import run_with_ngrok

app = Flask(__name__)
#this contains the path of folder that to store the images in
app.config["IMAGE_UPLOADS"] = "/content"
run_with_ngrok(app)  # Start ngrok when app is run

@app.route('/') 
def home():
    return render_template('index.html')

@app.route("/predict", methods=['POST'])
def predict():
    url = request.method
    image = request.files["image"]
    #the name of image file
    imgName = image.filename
    #save the image in colab directory /content 
    image.save(os.path.join(app.config["IMAGE_UPLOADS"], image.filename))
    img = cv2.imread(imgName,0)
    output=funfac(img)
    #return the emotion of the face's image to the html 
    return output

app.run()
