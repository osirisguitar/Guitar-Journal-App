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
    if (this.props.session) {
      return (
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: this.props.session.instrument ? this.props.session.instrument.imageUrl : null }} />
          <View>
            <Text>{this.props.session.date}</Text>
            <Text>{this.props.session.length}</Text>
            <Text>{this.props.session.instrument.name}</Text>
            <Text>{this.props.session.goal.title}</Text>
            <Text>{this.props.session.rating}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View/>
      );
    }
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    flexDirection: 'row'
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: 5,
    marginRight: 5
  }
});


module.exports = Session;