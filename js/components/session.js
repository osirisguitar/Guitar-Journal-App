'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Component,
  Picker,
  DatePickerIOS
} from 'react-native';

import Button from './single/button';
import moment from 'moment';

import InstrumentStore from '../stores/instrumentStore';
import GoalStore from '../stores/goalStore';
import Dispatcher from '../dispatcher/dispatcher';
import appStyles from '../styles/appStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import TextField from './single/textfield';
import RatingField from './single/ratingfield';

import config from '../config';

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
      session: this.props.editMode ? Object.assign({ date: new Date() }, this.props.session) : this.props.session,
      editMode: this.props.editMode,
      instruments: InstrumentStore.getAll(),
      goals: GoalStore.getAll(),
      pickInstrument: this.props.session.id ? false : true,
      pickGoal: this.props.session.id ? false : true
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
    console.log('Saving', this.state.session.date);
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
            <TextField style={{ marginTop: 10 }} icon='calendar' readOnly onPress={() => this.setState({pickDate: !this.state.pickDate})} value={moment(this.state.session.date).format('L LT')} />
            {
              this.state.pickDate ? <DatePickerIOS mode='datetime' style={[styles.textInput, styles.picker]} date={this.state.session.date} onDateChange={(value) => this.updateSession('date', value)} /> : <View/>
            }
            <TextField style={{marginTop: 10, marginBottom: 5}} icon='ios-timer' placeholder='Duration in minutes' value={this.stringValue(this.state.session.duration)} onChangeText={(value) => { this.updateSession('duration', value); }} />
            <TextField style={{marginTop: 5, marginBottom: 5}} icon='location' placeholder='Location' value={this.state.session.location} onChangeText={(value) => { this.updateSession('location', value); }} />
            <TextField style={{marginTop: 5, marginBottom: 5}} icon='document-text' multiline placeholder='Notes' value={this.state.session.notes} onChangeText={(value) => { this.updateSession('notes', value); }} />
            <RatingField style={{marginTop: 5, marginBottom: 5}} value={this.state.session.rating} onRatingChange={(value) => { this.updateSession('rating', value); }} />
            <TextField style={{ marginTop: 5 }} icon='settings' readOnly onPress={() => this.setState({pickInstrument: !this.state.pickInstrument})} value={this.state.session.instrument ? this.state.session.instrument.name : ''} />
            {
              this.state.pickInstrument ? <Picker selectedValue={this.state.session.instrumentId} style={[styles.textInput, styles.picker]} itemStyle={{color: 'white'}} onValueChange={ (value) => { value ? this.setSessionInstrument(value) : null; this.setState({pickInstrument: false}); } } >
                  <Picker.Item key={null} value={null} label={'Select instrument'} style={{ height: 50, color: 'white' }} />
                  {
                    this.state.instruments ? this.state.instruments.map(instrument => (
                        <Picker.Item key={instrument.id} value={instrument.id} label={instrument.name} style={{ height: 50, color: 'white' }}/>
                      )) : <Picker.Item key={null} value={null} label={'Select instrument'} style={{ height: 50, color: 'white' }}/>
                  }
                </Picker> : <View/>
            }
            <TextField style={{ marginTop: 10 }} icon='trophy' readOnly onPress={() => this.setState({pickGoal: !this.state.pickGoal})} value={this.state.session.goal ? this.state.session.goal.title : ''} />
            {
              this.state.pickGoal ? <Picker selectedValue={this.state.session.goalId} style={[styles.textInput, styles.picker]} itemStyle={{color: 'white'}} onValueChange={ (value) => { value ? this.setSessionGoal(value) : null; this.setState({pickGoal: false}); } } >
                  <Picker.Item key={null} value={null} label={'Select goal'} style={{ height: 50, color: 'white', paddingLeft: 0 }} />
                  {
                    this.state.goals ? this.state.goals.map(goal => (
                        <Picker.Item key={goal.id} value={goal.id} label={goal.title} style={{ height: 50, color: 'white' }}/>
                      )) : <Picker.Item key={null} value={null} label={'Select goal'} style={{ height: 50, color: 'white' }}/>
                  }
                </Picker> : <View/>
            }
            <View style={{ marginTop: 15 }}>
              <Button onPress={this.saveSession} text='SAVE' backgroundColor={appStyles.constants.greenHighlight} color={'white'} />
            </View>
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
            <View style={{flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch', overflow: 'hidden'}}>
              <Text style={{color: 'white', fontSize: 16}}>{moment(this.state.session.date).format('ddd D MMM YYYY hh:mm')}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', marginTop: 5, marginBottom: 5}}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>{this.state.session.duration} minutes</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 3}}>
                  {this.getStars(this.state.session.rating)}
                </View>
              </View>
              { this.state.session.location ? <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                <View style={{ width: 20, alignItems: 'center' }}>
                  <Icon name='pinpoint' size={20} color='white' style={{marginTop: 3}}/>
                </View>
                <Text style={{color: 'white', fontSize: 20, marginLeft: 5}}>{this.state.session.location}</Text>
              </View> : <View/> }
              { this.state.session.goal ? <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                <View style={{ width: 20, alignItems: 'center' }}>
                  <Icon name='trophy' size={20} color='white' style={{marginTop: 3}}/>
                </View>
                <Text style={{flex: 0, color: 'white', fontSize: 20, marginLeft: 5}} numberOfLines={1}>{this.state.session.goal.title}</Text>
              </View> : <View/> }
              { this.state.session.notes ? <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20}}>
                <View style={{ width: 20, alignItems: 'center' }}>
                  <Icon name='document-text' size={20} color='white' style={{marginTop: 1}}/>
                </View>
                <Text numberOfLines={5} style={{color: 'white', fontStyle: 'italic', fontSize: 16, marginLeft: 5, textAlign: 'left'}}>{this.state.session.notes}</Text>
              </View> : <View/> }
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

Session.propTypes = {
  navigator: React.PropTypes.object,
  editMode: React.PropTypes.bool,
  session: React.PropTypes.object
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

module.exports = Session;
