'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  Component
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import appStyles from '../styles/appStyles';

class Profile extends Component {
  constructor (props) {
    super(props);

    this.render = this.render.bind(this);
  }

  render () {
    return (
      <View>
        <Text>{}</Text>
        <LoginButton
          onLogoutFinished={() => {
            this.props.parentNavigator.pop();
          }}
        />
      </View>
    );
  }
}

Profile.propTypes = {
  navigator: React.PropTypes.object
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  }
});

module.exports = Profile;
