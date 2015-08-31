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
  getInitialState: function () {
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  openSession: function(session) {
  },

  sessionsChanged: function() {
  },

  render: function () {
    return (
      <View>
        <Text>Hej</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  listRow: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    margin: 2,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1
  },
  separator: {
    backgroundColor: 'black'
  },
  thumb: {
    width: 50,
    height: 50,
    marginRight: 5
  },
  title: {
    fontWeight: 'bold'
  },
});


module.exports = Session;