'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Component
} from 'react-native';

class Instrument extends Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);

    this.state = {
      instrument: this.props.editMode ? Object.assign({}, this.props.instrument) : this.props.instrument,
      editMode: this.props.editMode
    };
  }

  render () {
    if (this.state.instrument) {
      if (this.state.editMode) {

      } else {
        return (
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: this.props.instrument.imageUrl }} />
            <View>
              <Text>{this.props.instrument.name}</Text>
              <Text>{this.props.instrument.type}</Text>
            </View>
          </View>
        );
      }
    } else {
      return (
        <View/>
      );
    }
  }
}

var styles = StyleSheet.create({
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

module.exports = Instrument;
