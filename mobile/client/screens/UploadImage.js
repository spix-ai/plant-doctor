import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
// import { Block, theme, Text } from 'galio-framework';
import { Block, Button, Text, theme } from 'galio-framework';

import nowTheme from '../constants/Theme';
import Images from '../constants/Images';

const { width } = Dimensions.get('screen');

const UploadImage = () => {
  const [image, setImage] = useState(null);

  return (
    <Block>
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
          onPress={() => console.log('press')}
        >
          <Text style={{ fontFamily: 'montserrat-bold', fontSize: 14 }} color={theme.COLORS.WHITE}>
            Upload image
          </Text>
        </Button>
      </Block>
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
          color={nowTheme.COLORS.SPIXLIGHT}
          onPress={() => console.log('press')}
        >
          <Text style={{ fontFamily: 'montserrat-bold', fontSize: 14 }} color={theme.COLORS.WHITE}>
            Taking a picture
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

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

export default UploadImage;
