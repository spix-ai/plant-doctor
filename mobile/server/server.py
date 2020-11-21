#Import library
import os.path
import time
import numpy as np
import cv2
import json
from flask import Flask, request, Response
import uuid
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array
import warnings
from PIL import Image
warnings.simplefilter("ignore", DeprecationWarning)

#Function detect
def save_file(img):
    file_name = '%s.jpg'%uuid.uuid4().hex
    path_file = './static/'+file_name
    cv2.imwrite(path_file, img)
    return json.dumps(path_file) #return image file namefaces


model = tf.keras.models.load_model('./saved/model_15')
with open('./classes.json', 'r') as f:
    class_info = json.load(f)

#API
app = Flask(__name__)

@app.route('/')
def hello():
    print("Hello my friend")
    return Response(response='hello', status=200, mimetype="application/json") #return json string


#route http post to this method
@app.route('/predict', methods=['POST'])
def upload():
    start = time.time()
    #retrieve image from client
    img = cv2.imdecode(np.fromstring(request.files['image'].read(), np.uint8), cv2.IMREAD_UNCHANGED)
    img_pil = Image.fromarray(img)
    img_pil = img_pil.resize((380, 380))
    img_pil = img_to_array(img_pil)
    if img_pil.shape[2] == 1:
        img_pil = np.dstack([img_pil] * 3)
    else:
        img_pil = img_pil[:, :, :3]
   
    img_resize = np.array([img_pil / 255.])
    predict = model.predict(img_resize)
    predict = np.argmax(predict, axis=1)
    end = time.time()
    img_processed = save_file(img).replace("\"","")
    #response
    data_response = {
        #"id": id,
        #"fullname": fullname,
        "image_processed": img_processed,
        "info": class_info[str(predict[0])],
        "time_executed": float(end - start)
    }
    data_json = json.dumps(data_response)
    return data_json
    # return Response(response=data_json, status=200, mimetype="application/json") #return json string

#start server
if __name__ == "__main__":
    app.run(debug = True, host='0.0.0.0', port=5000)