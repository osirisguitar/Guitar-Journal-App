'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  Component
} from 'react-native';
import Instruments from './instruments';

class Profile extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Instruments</Text>
        <Instruments
          navigator={this.props.navigator}
        />
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
