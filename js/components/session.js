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

import InstrumentStore from '../stores/instrumentStore';
import GoalStore from '../stores/goalStore';
import SessionStore from '../stores/sessionStore';

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
    this.setState({ session: this.state.session });
  }

  setSessionGoal (goalId) {
    let newGoal = this.state.goals.filter(goal => {
      return goal.id === goalId;
    })[0];

    this.state.session.goal = newGoal;
    this.setState({ session: this.state.session });
  }

  updateSession (fieldName, newValue) {
    this.state.session[fieldName] = newValue;
    this.setState({ session: this.state.session });
  }

  saveSession () {
    SessionStore.updateItem(this.state.session);
    this.props.navigator.pop();
  }

  render () {
    if (this.state.session) {
      if (this.state.editMode) {
        return (
          <ScrollView style={styles.container}>
            <Text>Date</Text><TextInput value={this.state.session.date} onChangeText={(value) => { this.updateSession('date', value); }} style={styles.textInput} />
            <Text>Length</Text><TextInput value={this.state.session.length.toString()} onChangeText={(value) => { this.updateSession('length', value); }} style={styles.textInput}/>
            <Text>Instrument</Text>
            <Picker selectedValue={this.state.session.instrument.id} onValueChange={ (value) => this.setSessionInstrument(value) } >
              {
                this.state.instruments.map(instrument => (
                  <Picker.Item key={instrument.id} value={instrument.id} label={instrument.name} style={{ height: 50 }}/>
                ))
              }
            </Picker>
            <Text>Goal</Text>
            <Picker selectedValue={this.state.session.goal.id} onValueChange={ (value) => this.setSessionGoal(value) } >
              {
                this.state.goals.map(goal => (
                  <Picker.Item key={goal.id} value={goal.id} label={goal.title} style={{ height: 50 }}/>
                ))
              }
            </Picker>
            <Text>Rating</Text><TextInput value={this.state.session.rating.toString()} onChangeText={(value) => { this.updateSession('rating', value); }} style={styles.textInput}/>
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
              <Text>{this.state.session.date.toString()}</Text>
              <Text>{this.state.session.length}</Text>
              <Text>{this.state.session.instrument.name}</Text>
              <Text>{this.state.session.goal.title}</Text>
              <Text>{this.state.session.rating}</Text>
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
    //marginTop: 70,
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
