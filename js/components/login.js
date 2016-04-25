'use strict';

import Button from 'react-native-button';
import auth from '../stores/auth';
// var Display = require('react-native-device-display');

import React, {
  StyleSheet,
  View,
  TextInput,
  Image,
  Component
} from 'react-native';

class Login extends Component {
  constructor (props) {
    super(props);

    this.render = this.render.bind(this);
    this.logIn = this.logIn.bind(this);

    this.state = {
      email: 'test@bornholm.se',
      password: 'test'
    };
  }

  logIn () {
    return auth.login(this.state.email, this.state.password)
      .then(success => {
        if (success) {
          this.props.navigator.push({
            name: 'App',
            index: 1
          });
        }
      });
  }

  render () {
    return (
      <Image style={styles.image} source={require('image!login')}>
        <View style={styles.container}>
          <TextInput
            placeholder = {'Email'}
            multiline = {false}
            style={styles.inputField}
            keyboardType={'email-address'}
            clearButtonMode={'while-editing'}
            defaultValue={'test@bornholm.se'}
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            multiline = {false}
            placeholder = {'Password'}
            secureTextEntry
            clearButtonMode={'while-editing'}
            style={styles.inputField}
            defaultValue={'test'}
            onChangeText={(text) => this.setState({password: text})}
          />
          <Button onPress={this.logIn}>
            Log in
          </Button>
        </View>
      </Image>
    );
  }
}

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
    marginBottom: 10,
    backgroundColor: 'white',
    opacity: 0.8
  },
  image: {
    width: 480, // Display.width,
    height: 520, // Display.height,
    flex: 1,
    resizeMode: 'cover'
  }
});

module.exports = Login;
