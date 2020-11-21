import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { Block, Button, Card, Text, theme } from 'galio-framework';
import { Dimensions, ScrollView } from 'react-native';
import nowTheme from '../constants/Theme';
import Images from '../constants/Images';
const { width } = Dimensions.get('screen');
import treatments from '../constants/treatment';

export default class PredictedCard extends React.Component {

  render() {
    console.log(this.props.navigation.params)
    let { prediction } = this.props;

    return (
      <Block
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <Block row>
          <Text style={{ fontSize: 40 ,fontWeight: 'bold' }}> Plant</Text>
          <Text>{prediction.plant === '' ? 'Not Found' : prediction.plant}</Text>
        </Block>
        <Block row>
          <Text style={{ fontWeight: 'bold' }}> Disease</Text>
          <Text>{prediction.disease === '' ? 'Not Found' : prediction.disease}</Text>
        </Block>
        <Block row>
          <Block
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}> {prediction.medicine1}</Text>
            <Image style={{ width: 100, height: 100 }} source={{ uri: prediction.image1 }} />
          </Block>
          <Block
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}> {prediction.medicine2}</Text>
            <Image style={{ width: 100, height: 100 }} source={{ uri: prediction.image2 }} />
          </Block>
        </Block>
      </Block>
    );
  }
}
