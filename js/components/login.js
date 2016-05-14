'use strict';

import Button from './single/button';
import auth from '../stores/auth';
import TextField from './single/textfield';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import React, {
  StyleSheet,
  View,
  Image,
  Component
} from 'react-native';

import appStyles from '../styles/appStyles';

class Login extends Component {
  constructor (props) {
    super(props);

    this.render = this.render.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logInFaceBook = this.logInFaceBook.bind(this);

    this.state = {
      email: 'anders@bornholm.se',
      password: 'test'
    };

    AccessToken.getCurrentAccessToken()
      .then(token => {
        if (token) {
          this.logInFaceBook(token.accessToken);
        }
      })
      .catch(() => {
      });
  }

  logIn () {
    console.log(this.state.email, this.state.password);
    return auth.login(this.state.email, this.state.password)
      .then(success => {
        if (success) {
          this.props.navigator.push({
            name: 'App'
          });
        }
      });
  }

  logInFaceBook (fbAccessToken) {
    return auth.loginFaceBook(fbAccessToken)
      .then(success => {
        if (success) {
          this.props.navigator.push({
            name: 'App'
          });
        }
      });
  }

  render () {
    return (
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <Image style={styles.image} source={require('../images/marshall.jpg')}>
          <View style={styles.container}>
            <TextField style={{marginTop: 5, marginBottom: 5}} icon='email' defaultValue={'anders@bornholm.se'} placeholder={'Email'} keyboardType={'email-address'} onChangeText={(text) => this.setState({email: text})}/>
            <TextField style={{marginTop: 5, marginBottom: 5}} icon='key' defaultValue={'test'} placeholder={'Password'} secureTextEntry onChangeText={(text) => this.setState({password: text})}/>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Button backgroundColor={appStyles.constants.greenHighlight} color='white' onPress={this.logIn} text='LOG IN'/>
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <LoginButton
                readPermissions={['email']}
                onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken()
                      .then(token => {
                        this.logInFaceBook(token.accessToken);
                      });
                  }
                }
              }/>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

Login.propTypes = {
  navigator: React.PropTypes.object
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  inputField: {
    height: 40,
    paddingLeft: 46,
    backgroundColor: appStyles.constants.gray,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null
  }
});

module.exports = Login;
