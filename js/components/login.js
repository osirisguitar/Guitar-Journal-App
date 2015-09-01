'use strict';

var React = require('react-native');
var App = require('../app');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Component,
  SwitchIOS,
} = React; 

var Login = React.createClass({
  goToHome: function() {
    console.log('nav', this.props.navigator.push);
    this.props.navigator.push({
      name: 'App',
      index: 1
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({input: text})}
        />
        <Text>{'user input: '}</Text>
        <SwitchIOS onValueChange={this.goToHome}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
}); 

module.exports = Login;