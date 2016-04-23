'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  ScrollView,
  Component
} from 'react-native';

import Button from 'react-native-button';
import Dispatcher from '../dispatcher/dispatcher';

class Goal extends Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);
    this.saveGoal = this.saveGoal.bind(this);

    this.state = {
      editMode: this.props.editMode,
      goal: this.props.editMode ? Object.assign({}, this.props.goal) : this.props.goal
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

  render () {
    if (this.state.goal) {
      if (this.state.editMode) {
        return (
          <ScrollView style={styles.container}>
            <Text>Title</Text><TextInput value={this.state.goal.title} onChangeText={(value) => { this.updateGoal('title', value); }} style={styles.textInput}/>
            <Text>Active</Text><Switch value={this.state.goal.active} onValueChange={(value) => { this.updateGoal('active', value); }} />
            <Button onPress={this.saveGoal} style={{ height: 50 }}>
              Save
            </Button>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView style={styles.container}>
            <View>
              <Text>{this.state.goal.title}</Text>
              <Text>{this.state.goal.active ? 'active' : 'completed'}</Text>
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

module.exports = Goal;
