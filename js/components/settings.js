'use strict';

var React = require('react-native');
var moment = require('moment');

var {
  StyleSheet,
  Text,
  ListView,
  View,
  Component,
  TouchableHighlight,
  SegmentedControlIOS,
  Image
} = React; 

var Settings = React.createClass({
  render: function () {
    return (
      <View style={styles.container}>
        <SegmentedControlIOS values={['Profile', 'Instruments', 'Support']} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  }
});


module.exports = Settings;