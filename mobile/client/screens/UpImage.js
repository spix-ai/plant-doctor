import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image, Linking, TouchableHighlight } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { Block, Button, Text, theme } from 'galio-framework';
import { Dimensions, ScrollView } from 'react-native';
import nowTheme from '../constants/Theme';
import Images from '../constants/Images';
import PredictedCard from './PredictedCard';
import { Card } from '../components';

const { width } = Dimensions.get('screen');

import treatments from '../constants/treatment';
import articles from '../constants/articles';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class UpImage extends React.Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    prediction: {
      plant: '',
      disease: '',
      medicine: ['123', '3123'],
    },
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  };

  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const { navigate } = this.props.navigation;

      let data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      const formData = new FormData();
      formData.append('image', {
        uri: data.uri,
        type: 'image/jpg', // or photo.type
        name: 'testPhotoName',
      });
      const config = {
        method: 'POST',
        body: formData,
      };
      fetch('http://192.168.1.110:5000/predict', config)
        .then((response) => {
          response.json().then((data) => {
            this.setState({ prediction: data['info'] });
            console.log(data['info']);
            // navigate('Prediction', { param: data['info'] });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log(data.uri);
    const formData = new FormData();
    formData.append('image', {
      uri: data.uri,
      type: 'image/jpg', // or photo.type
      name: 'testPhotoName',
    });
    const config = {
      method: 'POST',
      body: formData,
    };
    fetch('http://192.168.1.110:5000/predict', config)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          this.setState({ prediction: data['info'] });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const prediction = this.state.prediction;
    let predictedLabel;

    console.log(prediction);
    if (prediction.plant === '') {
      predictedLabel = (
        <Block
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          row
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              paddingHorizontal: 25,
              fontFamily: 'montserrat-bold',
              color: nowTheme.COLORS.SPIXLIGHT,
            }}
          >
            Result display here ...
          </Text>
        </Block>
      );
    } else {
      predictedLabel = (
        <Block
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <Block row>
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'montserrat-bold',
              }}
            >
              Plant
            </Text>
            <Text style={{ fontSize: 20 }}>
              {prediction.plant === '' ? 'Not Found' : prediction.plant}
            </Text>
          </Block>
          <Block row>
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'montserrat-bold',
              }}
            >
              Disease
            </Text>
            <Text style={{ fontSize: 20 }}>
              {prediction.disease === '' ? 'Not Found' : prediction.disease}
            </Text>
          </Block>
          <Block
            row
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                padding: 20,
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'montserrat-bold',
                color: nowTheme.COLORS.SPIXLIGHT,
              }}
            >
              Suggest treatment
            </Text>
          </Block>

          <Block row>
            <Block
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {prediction.medicine1}</Text>
              <TouchableHighlight onPress={() => Linking.openURL('https://www.indiamart.com/proddetail/easy-imported-chemical-pesticide-13620818197.html')}>
                <Image style={{ width: 90, height: 90 }} source={{ uri: prediction.image1 }} />
              </TouchableHighlight>
            </Block>
            <Block
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {prediction.medicine2}</Text>
              <TouchableHighlight onPress={() => Linking.openURL('https://cnquenson.en.made-in-china.com/product/PBFQvWMAkShX/China-Agricultural-Chemical-Pesticide-of-Glyphosate-41-SL-CAS-1071-83-6.html')}>
                <Image style={{ width: 90, height: 90 }} source={{ uri: prediction.image2 }} />
              </TouchableHighlight>
            </Block>
          </Block>
        </Block>
      );
    }
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Block center>
          <View
            style={{
              position: 'absolute',
              height: 700,
              width: 300,
              alignItems: 'center',
              paddingTop: 300,
            }}
          >
            <View style={{ borderWidth: 5, backgroundColor: '#000' }}>
              <Camera
                style={{ flex: 1 }}
                type={this.state.cameraType}
                ref={(ref) => {
                  this.camera = ref;
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0.2, 0.2, 0.2, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                    }}
                    onPress={() => this.pickImage()}
                  >
                    <Ionicons name="ios-photos" style={{ color: '#fff', fontSize: 40 }} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                    }}
                    onPress={() => this.takePicture()}
                  >
                    <FontAwesome name="camera" style={{ color: '#fff', fontSize: 40 }} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                    }}
                    onPress={() => this.handleCameraType()}
                  >
                    <MaterialCommunityIcons
                      name="camera-switch"
                      style={{ color: '#fff', fontSize: 40 }}
                    />
                  </TouchableOpacity>
                </View>
              </Camera>
            </View>
          </View>
          {predictedLabel}
        </Block>
      );
    }
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});
