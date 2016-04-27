'use strict';

import {
  StyleSheet
} from 'react-native';

const constants = {
  bgColor: 'rgb(57, 66, 100)',
  green: 'rgb(17, 168, 171)',
  greenHighlight: 'rgb(17, 168, 171)',
  blue: 'rgb(26, 78, 149)',
  blueHighlight: 'rgb(52, 104, 175)',
  red: 'rgb(204, 50, 75)',
  redHighlight: 'rgb(230, 76, 101)',
  gray: 'rgb(80, 89, 123)',
  grayHighlight: 'rgb(144, 153, 183)',
  orange: 'rgb(252, 177, 80)'
};

module.exports = {
  styles: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: constants.bgColor
    },
    tabBar: {
      flex: 1,
      backgroundColor: constants.bgColor
    }
  }),
  constants: constants
};
