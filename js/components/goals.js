'use strict';

import GoalStore from '../stores/goalStore';
import moment from 'moment';
import Goal from './goal';

import React, {
  StyleSheet,
  Text,
  ListView,
  View,
  Component,
  TouchableHighlight,
  Image,
  Navigator
} from 'react-native'; 

class Goals extends Component {
  constructor (props) {
    super(props);

    GoalStore.getAll();

    this.state = {
      sessions: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentDidMount () {
    GoalStore.addChangeListener(this.goalsChanged);
  }

  componentWillUnmount () {
    GoalStore.removeChangeListener(this.goalsChanged);
  }

  goalsChanged () {
    var goals = GoalsStore.getAll();
    this.setState({ goals: this.state.goals.cloneWithRows(goals) });
  }

  openGoal (goals) {
    this.props.navigator.push({ 
      title: 'Goal', 
      component: Goal, 
      passProps: { goal: goal }, 
      rightButtonTitle: 'Edit', 
      onRightButtonPress: () => this.props.navigator.push({
        title: 'Edit Goal', 
        component: Goal, 
        passProps: { goal: goal }      
      })
    });
  }

  loadMoreGoals () {
    GoalStore.loadMoreGoals();
  }

  renderRow (rowData) {
    var date = moment(rowData.date);
    return(
      <TouchableHighlight onPress={() => this.openSession(rowData)} underlayColor='#dddddd'>
        <View style={styles.listRow}>
          <Image style={styles.thumb} source={{ uri: rowData.instrument ? rowData.instrument.imageUrl : null }} />
          <View>
            <Text style={styles.title}>{date.format('L')}: {rowData.length} minutes</Text>
            <Text>{rowData.goal.title} ({rowData.location})</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <ListView
        dataSource={this.state.sessions}
        renderRow={this.renderRow}
        onEndReached={this.loadMoreSessions}
      />
    );
  }
};

var styles = StyleSheet.create({
  listRow: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    margin: 2,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1
  },
  separator: {
    backgroundColor: 'black'
  },
  thumb: {
    width: 50,
    height: 50,
    marginRight: 5
  },
  title: {
    fontWeight: 'bold'
  },
});


module.exports = Sessions;