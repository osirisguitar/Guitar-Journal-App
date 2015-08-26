'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component,
} = React; 

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hej HEJ</Text>
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