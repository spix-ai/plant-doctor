## Plant Doctor - Mobile App

# Prerequisites
* python 3.6+
* tensorflow >= 2.3
* numpy
* cv2
* flask
* Pillow

# Run

## Get model
The checkpoint of model is from this [link](https://drive.google.com/drive/folders/1zMPET_JNirVhPujaKM8o3w5Itn4ImneF?usp=sharing)

Copy the checkpoint into `./server/saved`

    server  
    ├── saved
    │   └── model_15
    │       ├── assets
    │       └── variables
    └── static


## Server

Details of source in [server.py](server/server.py), please makesure folder of loaded model is existed.

    cd ./server
    python server.py

## Client

    cd ./client
    npm install or yarn install
    expo start