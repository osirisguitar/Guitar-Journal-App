'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Component
} from 'react-native';

import Button from './single/button';
import moment from 'moment';

import Dispatcher from '../dispatcher/dispatcher';
import appStyles from '../styles/appStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import TextField from './single/textfield';

import config from '../config';

class ProfileDetails extends Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);

    this.state = {
      editMode: this.props.editMode
    };
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  updateProfile (fieldName, newValue) {
    this.state.profile[fieldName] = newValue;
    this.setState({ profile: this.state.profile });
  }

  saveProfile () {
    Dispatcher.dispatch({
      type: 'profile.update',
      profile: this.state.profile
    });
  }

  stringValue (value) {
    return value ? value.toString() : value;
  }

  render () {
    if (this.state.editMode) {
      return (
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center'}}>
          <Text>Hej</Text>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'flex-start'}}>
          <View style={{alignItems: 'center', alignSelf: 'stretch', marginTop: 20, marginBottom: 20}}>
            <Image style={styles.image} source={{ uri: this.state.session.instrument ? config.fixImageUrl(this.state.session.instrument.imageUrl) : null }}>
              <View style={styles.imageBorder}/>
            </Image>
          </View>
        </ScrollView>
      );
    }
  }
}

ProfileDetails.propTypes = {
  navigator: React.PropTypes.object,
  editMode: React.PropTypes.bool
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0
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
    borderColor: appStyles.constants.green
  },
  textInput: {
    height: 50,
    paddingLeft: 48,
    justifyContent: 'center',
    backgroundColor: appStyles.constants.gray,
    borderColor: 'gray',
    borderWidth: 1
  },
  text: {
    paddingTop: 12,
    color: 'white',
    fontSize: 18
  },
  picker: {
    paddingLeft: 0,
    height: 200,
    marginBottom: 20
  }
});

module.exports = ProfileDetails;
