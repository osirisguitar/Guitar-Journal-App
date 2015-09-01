'use strict';

var React = require('react-native');
var SessionStore = require('../stores/sessionStore');
var moment = require('moment');

var {
  StyleSheet,
  Text,
  ListView,
  View,
  Component,
  TouchableHighlight,
  Image
} = React; 

var Session = React.createClass({
  render: function () {
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.props.session.date}</Text>
        </View>
        <View>
          <Text>{this.props.session.length}</Text>
        </View>
        <View>
          <Text>{this.props.session.instrument.name}</Text>
        </View>
        <View>
          <Text>{this.props.session.goal.title}</Text>
        </View>
        <View>
          <Text>{this.props.session.rating}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70
  }
});


module.exports = Session;