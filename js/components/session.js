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

  render () {
    if (this.state.session) {
      if (this.state.editMode) {
        return (
          <ScrollView style={styles.container}>
            <Text>Date</Text><TextInput value={moment(this.state.session.date).format('L')} onChangeText={(value) => { this.updateSession('date', new Date(value)); }} style={styles.textInput} />
            <Text>Duration</Text><TextInput value={this.stringValue(this.state.session.duration)} onChangeText={(value) => { this.updateSession('duration', value); }} style={styles.textInput}/>
            <Text>Location</Text><TextInput value={this.state.session.location} onChangeText={(value) => { this.updateSession('location', value); }} style={styles.textInput}/>
            <Text>Notes</Text><TextInput value={this.state.session.notes} onChangeText={(value) => { this.updateSession('notes', value); }} style={styles.textInput}/>
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
          <ScrollView style={styles.container}>
            <Image style={styles.image} source={{ uri: this.state.session.instrument ? this.state.session.instrument.imageUrl : null }} />
            <View>
              <Text>{moment(this.state.session.date).format('L')}</Text>
              <Text>{this.state.session.duration}</Text>
              <Text>{this.state.session.location}</Text>
              <Text>{this.state.session.notes}</Text>
              <Text>{this.state.session.rating}</Text>
              <Text>{this.state.session.instrument.name}</Text>
              <Text>{this.state.session.goal.title}</Text>
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
    flex: 1,
    // marginTop: 70,
    flexDirection: 'column'
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: 5,
    marginRight: 5
  },
  textInput: { height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }
});

module.exports = Session;
