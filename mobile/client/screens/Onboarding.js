import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';

export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <Image
            source={Images.OnboardingSpix}
            style={{
              flex : 1,
              height: 550,
              width,
              zIndex: 1,
              resizeMode: 'contain',
              marginBottom: 150
            }}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              {/* <Block middle>
                <Image source={Images.NowLogo} style={{ width: 115, height: 124, bottom: 200, position: 'absolute' }} />
              </Block> */}
              <Block>
                <Block middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      bottom: 80,
                      position: 'absolute',
                      letterSpacing: 2,
                      paddingHorizontal: 20,
                      textAlign: 'center',
                    }}
                    color="white"
                    size={24}
                  >
                    DOCTOR FOR PLANT
                  </Text>
                </Block>
              </Block>
              <Block middle row>
                <Text color="white" size={16} style={{ fontFamily: 'montserrat-regular' }}>
                  Powered by Spix
                </Text>
                <Image
                  source={Images.SpixLogo}
                  style={{
                    height: 50,
                    width: 50,
                    marginLeft: theme.SIZES.BASE,
                  }}
                />
              </Block>
              {/* <Block middle row style={{ marginTop: 15, marginBottom: 30}}>
                <Text
                  color="white"
                  size={16}
                  style={{ fontFamily: 'montserrat-regular' }}
                >
                  Coded by
                </Text>
                <Image
                  source={Images.CreativeTimLogo}
                  style={{
                    height: 29,
                    width: 129,
                    marginLeft: theme.SIZES.BASE
                  }}
                />
              </Block> */}

              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2,
                }}
              >
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.SPIX}
                  onPress={() => navigation.navigate('App')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    GET STARTED
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});