'use strict';

import React, {
  StyleSheet,
  View,
  Component
} from 'react-native';

class Profile extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  }
});

module.exports = Profile;
