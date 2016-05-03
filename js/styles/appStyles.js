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
    },
    listRow: {
      flex: 1,
      height: 80,
      flexDirection: 'row',
      borderBottomColor: constants.gray,
      borderBottomWidth: 1,
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10
    },
    listThumb: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderRadius: 25
    },
    listThumbBorder: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: constants.green,
      marginRight: 10
    },
    listTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: 'white'
    }
  }),
  constants: constants
};
