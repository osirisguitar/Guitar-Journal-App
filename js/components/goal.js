'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  Component
} from 'react-native';

import Button from './single/button';
import TextField from './single/textfield';
import Dispatcher from '../dispatcher/dispatcher';
import Icon from 'react-native-vector-icons/Ionicons';
import appStyles from '../styles/appStyles';

class Goal extends Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);
    this.saveGoal = this.saveGoal.bind(this);
    this.updateGoal = this.updateGoal.bind(this);

    this.state = {
      editMode: this.props.editMode,
      goal: this.props.editMode ? Object.assign({ sessions: 0, sessionDurations: 0 }, this.props.goal) : this.props.goal
    };
  }

  updateGoal (fieldName, newValue) {
    this.state.goal[fieldName] = newValue;
    this.setState({ goal: this.state.goal });
  }

  saveGoal () {
    if (this.state.goal.id) {
      Dispatcher.dispatch({
        type: 'goal.update',
        goal: this.state.goal
      });
    } else {
      Dispatcher.dispatch({
        type: 'goal.add',
        goal: this.state.goal
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

  render () {
    if (this.state.goal) {
      if (this.state.editMode) {
        return (
          <ScrollView style={styles.container}>
            <TextField icon='pricetag' value={this.state.goal.title} onChangeText={(value) => { this.updateGoal('title', value); }} />
            <View style={styles.input}>
              <Text style={styles.text}>{this.state.goal.completed ? 'Completed' : 'Active' }</Text>
              <Switch value={!this.state.goal.completed} onValueChange={(value) => { this.updateGoal('completed', !value); }} onTintColor={appStyles.constants.greenHighlight}/>
              <View style={{width: 32, position: 'absolute', top: 9, left: 8, backgroundColor: 'transparent', alignItems: 'center'}}>
                <Icon name='checkmark' size={32} color={appStyles.constants.grayHighlight} />
              </View>
            </View>
            <Button onPress={this.saveGoal} text='SAVE' backgroundColor={appStyles.constants.greenHighlight} color={'white'} />
          </ScrollView>
        );
      } else {
        return (
          <ScrollView style={styles.container}>
            <View>
              <Text numberOfLines={1} style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{this.state.goal.title}</Text>
              <Text style={{color: 'white', fontSize: 16}}>{this.state.goal.completed ? 'Completed' : 'Active'}</Text>
              <Text style={{color: 'white', fontSize: 16}}>{this.state.goal.sessions} sessions, {this.transformDuration(this.state.goal.sessionDurations)}</Text>
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

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  input: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: appStyles.constants.gray,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    paddingLeft: 48,
    paddingRight: 10,
    color: 'white',
    fontSize: 18,
    width: 150
  }
});

module.exports = Goal;
