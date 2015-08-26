'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component,
} = React; 

var Login = React.createClass({
  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({input: text})}
        />
        <Text>{'user input: ' + this.state.input}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
}); 

module.exports = Home;