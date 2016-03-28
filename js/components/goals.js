'use strict';

import GoalStore from '../stores/goalStore';
import Goal from './goal';

import React, {
  StyleSheet,
  Text,
  ListView,
  View,
  Component,
  TouchableHighlight,
  SegmentedControlIOS
} from 'react-native';

class Goals extends Component {
  constructor (props) {
    super(props);

    GoalStore.getAll();

    this.renderRow = this.renderRow.bind(this);
    this.openGoal = this.openGoal.bind(this);
    this.goalsChanged = this.goalsChanged.bind(this);

    this.state = {
      goals: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount () {
    // Dumb closure needed because of scope set by event callback
    GoalStore.addChangeListener(this.goalsChanged);
  }

  componentWillUnmount () {
    GoalStore.removeChangeListener(this.goalsChanged);
  }

  goalsChanged () {
    let loadedGoals = GoalStore.getAll();
    this.setState({ goals: this.state.goals.cloneWithRows(loadedGoals) });
  }

  openGoal (goal) {
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
    GoalStore.loadMoreFromApi();
  }

  renderRow (rowData) {
    return (
      <TouchableHighlight onPress={() => this.openGoal(rowData)} underlayColor='#dddddd'>
        <View style={styles.listRow}>
          <View>
            <Text style={styles.title}>{rowData.title}</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <SegmentedControlIOS values={['Active', 'Completed']} selectedIndex={0} />
        <ListView
          style={styles.list}
          dataSource={this.state.goals}
          renderRow={this.renderRow}
          onEndReached={this.loadMoreGoals}
          contentInset={{bottom: 49}}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  },
  list: {
  },
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
  }
});

module.exports = Goals;
