import io
import json
import pickle
import flask
from flask import request
from flask_cors import CORS, cross_origin
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image

import utils

model = tf.keras.models.load_model('./saved/model_15')
with open('./classes.json', 'r') as f:
    class_info = json.load(f)

app = flask.Flask("__main__")
CORS(app)
cors = CORS(app, resources={
    r'/*': {
        'origins': '*'
    }
})


@app.route("/")
def home():
    return flask.render_template("index.html", token="Hello world")


@app.route('/predict', methods=["POST"])
def predict():
    data = {'success': False}
    if request.files.getlist("images[]"):
        images = request.files.getlist("images[]")
        images_preprocess = []
        items = []
        for image in images:
            item = {}
            image = image.read()
            image = Image.open(io.BytesIO(image))
            image = utils.preprocess_image(image)

            images_preprocess.append(image / 255.)
            item['image'] = utils.encode_image(image)
            items.append(item)

        images_preprocess = np.array(images_preprocess)
        predicts = model.predict(images_preprocess, steps=len(images))
        predicts = np.argmax(predicts, axis=1)
        for idx, predict in enumerate(predicts):
            items[idx]['info'] = class_info[str(predict)]

        data['success'] = True
        data['data'] = items
    print(data)
    return json.dumps(data, ensure_ascii=False, cls=utils.NumpyEncoder)


app.run(debug=True, port=5000)
