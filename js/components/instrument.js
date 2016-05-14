'use strict';

import React, {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Component
} from 'react-native';

import Button from './single/button';
import Dispatcher from '../dispatcher/dispatcher';
import TextField from './single/textfield';
import Icon from 'react-native-vector-icons/Ionicons';

var ImagePickerManager = require('NativeModules').ImagePickerManager;

import appStyles from '../styles/appStyles';
import config from '../config';

let imagePickerOptions = {
  title: 'Select Instrument Image', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 120, // video recording max time in seconds
  maxWidth: 300, // photos only
  maxHeight: 300, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

class Instrument extends Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);
    this.saveInstrument = this.saveInstrument.bind(this);
    this.updateInstrument = this.updateInstrument.bind(this);
    this.openImagePicker = this.openImagePicker.bind(this);

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

  transformDuration (minutes) {
    if (minutes < 60) {
      return minutes + ' min';
    } else {
      return Math.floor(minutes / 60) + ' h ' + minutes % 60 + ' min';
    }
  }

  openImagePicker () {
    ImagePickerManager.showImagePicker(imagePickerOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else {
        // You can display the image using either data:
        const source = 'data:image/jpeg;base64,' + response.data;

        this.updateInstrument('imageUrl', source);
      }
    });
  }

  render () {
    if (this.state.instrument) {
      if (this.state.editMode) {
        return (
          <ScrollView style={styles.container}>
            <View style={{alignItems: 'center', alignSelf: 'stretch', marginTop: 20, marginBottom: 20}}>
              <TouchableHighlight onPress={this.openImagePicker}>
                <Image style={styles.image} source={{ uri: config.fixImageUrl(this.state.instrument.imageUrl) }}>
                  <View style={styles.imageBorder}/>
                </Image>
              </TouchableHighlight>
            </View>
            <TextField value={this.state.instrument.name} placeholder={'Name'} onChangeText={(value) => { this.updateInstrument('name', value); }} style={{marginTop: 5, marginBottom: 5}} icon='pricetag' />
            <TextField value={this.state.instrument.type} placeholder={'Type'} onChangeText={(value) => { this.updateInstrument('type', value); }} style={{marginTop: 5, marginBottom: 5}} icon='information-circled' />
            <TextField value={this.state.instrument.description} placeholder={'Description'} onChangeText={(value) => { this.updateInstrument('description', value); }} style={{marginTop: 5, marginBottom: 5}} icon='document-text' />
            <Button onPress={this.saveInstrument} style={{ height: 50 }} text={'Save'} color={'white'} backgroundColor={appStyles.constants.gray}/>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView style={styles.container}>
            <View style={{alignItems: 'center', alignSelf: 'stretch', marginTop: 20, marginBottom: 20}}>
              <Image style={styles.image} source={{ uri: config.fixImageUrl(this.state.instrument.imageUrl) }}>
                <View style={styles.imageBorder}/>
              </Image>
            </View>
            <View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Icon name='pricetag' size={20} color='white' style={{marginTop: 1}}/>
                <Text style={{color: 'white', fontSize: 20, marginLeft: 5, marginBottom: 5}}>{this.props.instrument.name}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start',marginBottom: 10}}>
                <Icon name='information-circled' size={20} color='white' style={{marginTop: 1}}/>
                <Text style={{color: 'white', fontSize: 20, marginLeft: 5}}>{this.props.instrument.type}</Text>
              </View>
              <View>
                <Text numberOfLines={5} style={{color: 'white', fontStyle: 'italic', fontSize: 16, marginTop: 10, marginLeft: 5, textAlign: 'left'}}>Used in {this.props.instrument.sessions} sessions for a total time of {this.transformDuration(this.props.instrument.sessionDurations)}</Text>
              </View>
            </View>
          </ScrollView>
        );
      }
    } else {
      return (
        <View/>
      );
    }
  }
}

Instrument.propTypes = {
  navigator: React.PropTypes.object,
  instrument: React.PropTypes.object,
  editMode: React.PropTypes.bool
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125
  },
  imageBorder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 5,
    borderColor: appStyles.constants.gray
  },
  textInput: { height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }
});

module.exports = Instrument;
