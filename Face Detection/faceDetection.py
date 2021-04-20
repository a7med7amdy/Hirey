%matplotlib inline
import matplotlib.pyplot as plt
import seaborn as sns; sns.set()
import numpy as np
from skimage import data,color,feature,transform
import os
import skimage.io as io
from sklearn.utils import shuffle
from sklearn.model_selection import cross_val_score , GridSearchCV
from sklearn.svm import LinearSVC
import cv2
import numpy as np
from numba import jit, cuda
import pickle
import timeit


def non_max_suppression_fast(boxes, overlapThresh):
	# if there are no boxes, return an empty list
	if len(boxes) == 0:
		return []
	# if the bounding boxes integers, convert them to floats --
	# this is important since we'll be doing a bunch of divisions
	if boxes.dtype.kind == "i":
		boxes = boxes.astype("float")
	# initialize the list of picked indexes	
	pick = []
	# grab the coordinates of the bounding boxes
	x1 = boxes[:,2]
	y1 = boxes[:,0]
	x2 = boxes[:,3]
	y2 = boxes[:,1]
	# compute the area of the bounding boxes and sort the bounding
	# boxes by the bottom-right y-coordinate of the bounding box
	area = (x2 - x1 + 1) * (y2 - y1 + 1)
	idxs = np.argsort(y2)
	# keep looping while some indexes still remain in the indexes
	# list
	while len(idxs) > 0:
		# grab the last index in the indexes list and add the
		# index value to the list of picked indexes
		last = len(idxs) - 1
		i = idxs[last]
		pick.append(i)
		# find the largest (x, y) coordinates for the start of
		# the bounding box and the smallest (x, y) coordinates
		# for the end of the bounding box
		xx1 = np.maximum(x1[i], x1[idxs[:last]])
		yy1 = np.maximum(y1[i], y1[idxs[:last]])
		xx2 = np.minimum(x2[i], x2[idxs[:last]])
		yy2 = np.minimum(y2[i], y2[idxs[:last]])
		# compute the width and height of the bounding box
		w = np.maximum(0, xx2 - xx1 + 1)
		h = np.maximum(0, yy2 - yy1 + 1)
		# compute the ratio of overlap
		overlap = (w * h) / area[idxs[:last]]
		# delete all indexes from the index list that have
		idxs = np.delete(idxs, np.concatenate(([last],
			np.where(overlap > overlapThresh)[0])))
	# return only the bounding boxes that were picked using the
	# integer data type
	return boxes[pick].astype("int")

#from numba import njit, cfunc, vectorize, guvectorize


def find(image,model):    
    boxes=[[i,i+k,j,int(j+k)] for k in [35,40,45,50] for i in range(0,image.shape[0]-k,10) for j in range(0,image.shape[1]-k,10) if (model.predict([feature.hog(transform.resize(image[i:i+k,j:int(j+k)],(48,48)))])[0] == 1)]
    return boxes


cap = cv2.VideoCapture(0)
loaded_model = pickle.load(open("faceDetection2.sav", 'rb'))
k=0
while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()
    ff=frame
    if k%20 == 0:
        frameTemp = color.rgb2gray(frame)
        frameTemp=transform.resize(frameTemp,(100,100))
        rects = find(frameTemp,loaded_model)
        rects = np.array(rects)
        rects = non_max_suppression_fast(rects, 0.2)
        for rect in rects:
            cv2.rectangle(frameTemp, (rect[2], rect[0]), (rect[3], rect[1]), (0, 0, 255), 2)
        io.imsave(str(k)+'.jpg',frameTemp)
    
    # Display the resulting frame
    cv2.imshow('frame',ff)
    k+=1
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()

