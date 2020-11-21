import os
import io
import json
import config
import base64
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2
from tensorflow.keras.preprocessing.image import img_to_array


class NumpyEncoder(json.JSONEncoder):
    '''
    Encoding numpy into json
    '''

    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, np.int32):
            return int(obj)
        if isinstance(obj, np.int64):
            return int(obj)
        if isinstance(obj, np.float32):
            return float(obj)
        if isinstance(obj, np.float64):
            return float(obj)
        return json.JSONEncoder.default(self, obj)


def preprocess_image(image):
    image = image.resize((config.image_width, config.image_height))
    image = img_to_array(image)
    if image.shape[2] == 1:
        image = np.dstack([image] * 3)
    else:
        image = image[:, :, :3]
    return image


def encode_image(image):
    image = image.astype(np.uint8)
    img = Image.fromarray(image)
    img = img.resize((600, 600))
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img

