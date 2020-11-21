import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, Button } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

import UploadImage from './UploadImage';
import UpImage from './UpImage';

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          <Card item={articles[0]} horizontal />
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {/* {this.renderArticles()} */}
        {/* <Text>
          Hello
        </Text> */}
        <UpImage navigation={this.props.navigation} />
        {/* <UploadImage/> */}
      </Block>
      // <Block flex center style={styles.home}>
      //   <UploadImage />
      //   <Text color="white" size={50} style={{ fontFamily: 'montserrat-regular' }}>
      //       UPLOAD IMAGE
      //     </Text>

      // </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    // width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});

export default Home;
