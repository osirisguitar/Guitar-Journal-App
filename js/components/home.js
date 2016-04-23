'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component,
} = React; 

import InstrumentStore from '../stores/instrumentStore';
import GoalStore from '../stores/goalStore';
import SessionStore from '../stores/sessionStore';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hej HEJ</Text>
        <Text>Instrumentstore: {InstrumentStore.getAll()}</Text>
        <Text>GoalStore: {GoalStore.getAll()}</Text>
        <Text>SessionStore: {SessionStore.getAll()}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 165
  }
}); 

module.exports = Home;