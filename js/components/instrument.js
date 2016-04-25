'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Component
} from 'react-native';

import Button from 'react-native-button';
import Dispatcher from '../dispatcher/dispatcher';

class Instrument extends Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);
    this.saveInstrument = this.saveInstrument.bind(this);
    this.updateInstrument = this.updateInstrument.bind(this);

    this.state = {
      instrument: this.props.editMode ? Object.assign({}, this.props.instrument) : this.props.instrument,
      editMode: this.props.editMode
    };
  }

  updateInstrument (fieldName, newValue) {
    this.state.instrument[fieldName] = newValue;
    this.setState({ instrument: this.state.instrument });
  }

  saveInstrument () {
    if (this.state.instrument.id) {
      Dispatcher.dispatch({
        type: 'instrument.update',
        instrument: this.state.instrument
      });
    } else {
      Dispatcher.dispatch({
        type: 'instrument.add',
        instrument: this.state.instrument
      });
    }
    this.props.navigator.pop();
  }

  render () {
    if (this.state.instrument) {
      if (this.state.editMode) {
        return (
          <ScrollView style={styles.container}>
            <Text>Name</Text><TextInput value={this.state.instrument.name} onChangeText={(value) => { this.updateInstrument('name', value); }} style={styles.textInput}/>
            <Text>Type</Text><TextInput value={this.state.instrument.type} onChangeText={(value) => { this.updateInstrument('type', value); }} style={styles.textInput}/>
            <Text>ImageUrl</Text><TextInput value={this.state.instrument.imageUrl} onChangeText={(value) => { this.updateInstrument('imageUrl', value); }} style={styles.textInput}/>
            <Button onPress={this.saveInstrument} style={{ height: 50 }}>
              Save
            </Button>
          </ScrollView>
        );
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
  },
  textInput: { height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }
});

module.exports = Instrument;
