import numpy as np
import pandas as pd
import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
image_size = 380
BATCH_SIZE = 4
base_dir = "/home/levanpon1009/work/data/archive/new plant diseases dataset(augmented)/New Plant Diseases Dataset(Augmented)"

valid_datagen = ImageDataGenerator(rescale=1. / 255)
valid_set = valid_datagen.flow_from_directory(base_dir + '/train',
                                              target_size=(image_size, image_size),
                                              batch_size=BATCH_SIZE,
                                              class_mode='categorical',)
print(valid_set.class_indices)
