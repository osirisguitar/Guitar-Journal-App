'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  Component,
  SegmentedControlIOS
} from 'react-native';
import Instruments from './instruments';

let activeViews = [ 'Profile', 'Instruments', 'Support' ];

class Profile extends Component {
  constructor (props) {
    super(props);

    this.render = this.render.bind(this);

    this.state = {
      view: activeViews[0]
    };
  }

  render () {
    let activeView;

    switch (this.state.view) {
      case 'Profile':
        activeView = <Text>Profile</Text>;
        break;
      case 'Instruments':
        activeView = <Instruments navigator={this.props.navigator} />;
        break;
      case 'Support':
        activeView = <Text>Support</Text>;
        break;
    }

    return (
      <View style={styles.container}>
        <SegmentedControlIOS values={activeViews} selectedIndex={0} onChange={ event => { console.log(activeViews[event.nativeEvent.selectedSegmentIndex]); this.setState({view: activeViews[event.nativeEvent.selectedSegmentIndex]}); } } />
        { activeView }
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
