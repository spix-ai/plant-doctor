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

export default class Chat extends React.Component {
  render() {
    console.log(this.props.navigation.params);
    let { prediction } = this.props;

    return (
      <Block>
        <Text>Hello Chat Here !</Text>
      </Block>
    );
  }
}
