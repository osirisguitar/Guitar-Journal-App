'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  Component
} from 'react-native';

class Goal extends Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);
  }

  render () {
    console.log('Rendering goal');
    if (this.props.goal) {
      return (
        <View style={styles.container}>
          <View>
            <Text>{this.props.goal.title}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View/>
      );
    }
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    flexDirection: 'row'
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: 5,
    marginRight: 5
  }
});

module.exports = Goal;
