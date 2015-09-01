'use strict';

var React = require('react-native');
var App = require('../app');
var Button = require('react-native-button');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Component,
  SwitchIOS,
  GlobalStore
} = React; 



var Login = React.createClass({
  goToHome: function() {
    this.props.navigator.push({
      name: 'App',
      index: 1
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder = {'Email'}
          multiline = {false}
          style={styles.inputField}
          keyboardType={'email-address'}
          clearButtonMode={'while-editing'}
          defaultValue={'anders@bornholm.se'}
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          multiline = {false}
          placeholder = {'Password'}
          secureTextEntry = {true}
          clearButtonMode={'while-editing'}
          style={styles.inputField}
          onChangeText={(text) => this.setState({password: text})}
        />
        <Button onPress={this.goToHome}>
          Log in
        </Button>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingLeft: 20,
    paddingRight: 20
  },
  inputField: {
    height: 40,
    paddingLeft: 5,
    borderWidth: 1
  }
}); 

module.exports = Login;