'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Component,
  Picker
} from 'react-native';

import Button from 'react-native-button';
import moment from 'moment';

import InstrumentStore from '../stores/instrumentStore';
import GoalStore from '../stores/goalStore';
import Dispatcher from '../dispatcher/dispatcher';
import appStyles from '../styles/appStyles';
import Icon from 'react-native-vector-icons/Ionicons';

class Session extends Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);
    this.instrumentsChanged = this.instrumentsChanged.bind(this);
    this.goalsChanged = this.goalsChanged.bind(this);
    this.setSessionInstrument = this.setSessionInstrument.bind(this);
    this.setSessionGoal = this.setSessionGoal.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.saveSession = this.saveSession.bind(this);

    this.state = {
      session: this.props.editMode ? Object.assign({}, this.props.session) : this.props.session,
      editMode: this.props.editMode,
      instruments: InstrumentStore.getAll(),
      goals: GoalStore.getAll()
    };
  }

  componentDidMount () {
    InstrumentStore.addChangeListener(this.instrumentsChanged);
    GoalStore.addChangeListener(this.goalsChanged);
  }

  componentWillUnmount () {
    InstrumentStore.removeChangeListener(this.instrumentsChanged);
    GoalStore.removeChangeListener(this.goalsChanged);
  }

  instrumentsChanged () {
    this.setState({ instruments: InstrumentStore.getAll() });
  }

  goalsChanged () {
    this.setState({ goals: GoalStore.getAll() });
  }

  setSessionInstrument (instrumentId) {
    let newInstrument = this.state.instruments.filter(instrument => {
      return instrument.id === instrumentId;
    })[0];

    this.state.session.instrument = newInstrument;
    this.state.session.instrumentId = instrumentId;
    this.setState({ session: this.state.session });
  }

  setSessionGoal (goalId) {
    let newGoal = this.state.goals.filter(goal => {
      return goal.id === goalId;
    })[0];

    this.state.session.goal = newGoal;
    this.state.session.goalId = goalId;
    this.setState({ session: this.state.session });
  }

  updateSession (fieldName, newValue) {
    this.state.session[fieldName] = newValue;
    this.setState({ session: this.state.session });
  }

  saveSession () {
    if (this.state.session.id) {
      Dispatcher.dispatch({
        type: 'session.update',
        session: this.state.session
      });
    } else {
      Dispatcher.dispatch({
        type: 'session.add',
        session: this.state.session
      });
    }
    this.props.navigator.pop();
  }

  stringValue (value) {
    return value ? value.toString() : value;
  }

  getStars (rating) {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(i < rating);
    }

    let key = 0;
    return stars.map(star => {
      if (star) {
        return <Icon name='ios-star' size={30} key={key++} color='white' />;
      } else {
        return <Icon name='ios-star-outline' size={30} key={key++} color='white' />;
      }
    });
  }

  render () {
    if (this.state.session) {
      if (this.state.editMode) {
        return (
          <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center'}}>
            <View style={{paddingTop: 16, paddingBottom: 16}}>
              <TextInput value={moment(this.state.session.date).format('L')} onChangeText={(value) => { this.updateSession('date', new Date(value)); }} style={styles.textInput} />
              <Icon name='calendar' size={32} color={appStyles.constants.grayHighlight} style={{position: 'absolute', top: 20, left: 10, backgroundColor: 'transparent'}} />
            </View>
            <View style={{paddingTop: 16, paddingBottom: 16}}>
              <TextInput value={this.stringValue(this.state.session.duration)} onChangeText={(value) => { this.updateSession('duration', value); }} style={styles.textInput}/>
              <Icon name='ios-timer' size={32} color={appStyles.constants.grayHighlight} style={{position: 'absolute', top: 20, left: 10, backgroundColor: 'transparent'}} />
            </View>
            <View style={{paddingTop: 16, paddingBottom: 16}}>
              <TextInput value={this.state.session.location} onChangeText={(value) => { this.updateSession('location', value); }} style={styles.textInput}/>
              <Icon name='location' size={32} color={appStyles.constants.grayHighlight} style={{position: 'absolute', top: 20, left: 10, backgroundColor: 'transparent'}} />
            </View>
            <Text>Notes</Text><TextInput multiline value={this.state.session.notes} onChangeText={(value) => { this.updateSession('notes', value); }} style={styles.textInput}/>
            <Text>Rating</Text><TextInput value={this.stringValue(this.state.session.rating)} onChangeText={(value) => { this.updateSession('rating', value); }} style={styles.textInput}/>
            <Text>Instrument</Text>
            <Picker selectedValue={this.state.session.instrumentId} onValueChange={ (value) => this.setSessionInstrument(value) } >
              <Picker.Item key={null} value={null} label={'Select instrument'} style={{ height: 50 }}/>
              {
                this.state.instruments ? this.state.instruments.map(instrument => (
                    <Picker.Item key={instrument.id} value={instrument.id} label={instrument.name} style={{ height: 50 }}/>
                  )) : <Picker.Item key={null} value={null} label={'Select instrument'} style={{ height: 50 }}/>
              }
            </Picker>
            <Text>Goal</Text>
            <Picker selectedValue={this.state.session.goalId} onValueChange={ (value) => this.setSessionGoal(value) } >
              <Picker.Item key={null} value={null} label={'Select goal'} style={{ height: 50 }}/>
              {
                this.state.goals ? this.state.goals.map(goal => (
                  <Picker.Item key={goal.id} value={goal.id} label={goal.title} style={{ height: 50 }}/>
                )) : <Picker.Item key={null} value={null} label={'Select goals'} style={{ height: 50 }}/>
              }
            </Picker>
            <Button onPress={this.saveSession} style={{ height: 50 }}>
              Save
            </Button>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'flex-start'}}>
            <View style={{alignItems: 'center', alignSelf: 'stretch', marginTop: 20, marginBottom: 20}}>
              <Image style={styles.image} source={{ uri: this.state.session.instrument ? this.state.session.instrument.imageUrl : null }}>
                <View style={styles.imageBorder}/>
              </Image>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch'}}>
              <Text style={{color: 'white', fontSize: 16}}>{moment(this.state.session.date).format('ddd D MMM YYYY')}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', marginTop: 5, marginBottom: 5}}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>{this.state.session.duration} minutes</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {this.getStars(this.state.session.rating)}
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Icon name='ios-home' size={20} color='white' style={{marginTop: 1}}/>
                  <Text style={{color: 'white', fontSize: 20, marginLeft: 5}}>{this.state.session.location}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Icon name='trophy' size={20} color='white' style={{marginTop: 1}}/>
                  <Text style={{color: 'white', fontSize: 20, marginLeft: 5}}>{this.state.session.goal.title}</Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
                <Icon name='document-text' size={16} color='white' style={{marginTop: 1}}/>
                <Text numberOfLines={5} style={{color: 'white', fontStyle: 'italic', fontSize: 16, marginLeft: 5, textAlign: 'left'}}>{this.state.session.notes}</Text>
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

var styles = StyleSheet.create({
  container: {
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
    borderColor: appStyles.constants.green
  },
  textInput: {
    height: 40,
    paddingLeft: 46,
    backgroundColor: appStyles.constants.gray,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white'
  }
});

module.exports = Session;
