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

import appStyles from '../styles/appStyles';

let dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => { return row1 !== row2; }
});

class Goals extends Component {
  constructor (props) {
    super(props);

    let goals = GoalStore.getAll();
    let showActive = true;

    this.renderRow = this.renderRow.bind(this);
    this.openGoal = this.openGoal.bind(this);
    this.goalsChanged = this.goalsChanged.bind(this);
    this.changeFilter = this.changeFilter.bind(this);

    if (goals) {
      goals = goals.filter(goal => {
        return goal.active === showActive;
      });
    }

    this.state = {
      dataSource: goals ? dataSource.cloneWithRows(goals) : dataSource,
      showActive: showActive
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
    if (loadedGoals) {
      loadedGoals = loadedGoals.filter(goal => {
        return goal.active === this.state.showActive;
      });
      this.setState({ dataSource: dataSource.cloneWithRows(loadedGoals) });
    }
  }

  changeFilter (filterIndex) {
    let showActive = filterIndex === 0;

    this.setState({ showActive: showActive });
    this.goalsChanged();
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
        passProps: { goal: goal, editMode: true }
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
        <SegmentedControlIOS tintColor={appStyles.constants.redHighlight} values={['Active', 'Completed']} selectedIndex={0} onChange={ event => this.changeFilter(event.nativeEvent.selectedSegmentIndex) } />
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onEndReached={this.loadMoreGoals}
          contentInset={{bottom: 49}}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
}

Goals.propTypes = {
  navigator: React.PropTypes.object
};

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
