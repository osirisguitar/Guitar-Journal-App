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
import Icon from 'react-native-vector-icons/Ionicons';

let dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => { return row1 !== row2; }
});

class Goals extends Component {
  constructor (props) {
    super(props);

    let showActive = true;

    let goals = GoalStore.getAll();

    this.renderRow = this.renderRow.bind(this);
    this.openGoal = this.openGoal.bind(this);
    this.goalsChanged = this.goalsChanged.bind(this);
    this.changeFilter = this.changeFilter.bind(this);

    if (goals) {
      goals = goals.filter(goal => {
        return !goal.completed;
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
        return this.state.showActive ? !goal.completed : goal.completed;
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

  transformDuration (minutes) {
    if (minutes < 60) {
      return minutes + ' min';
    } else {
      return Math.floor(minutes / 60) + ' h ' + minutes % 60 + ' min';
    }
  }

  renderRow (rowData) {
    return (
      <TouchableHighlight onPress={() => this.openGoal(rowData)} underlayColor={appStyles.constants.redHighlight}>
        <View style={[appStyles.styles.listRow, { height: 60 }]}>
          <View>
            <Icon style={{marginLeft:11, marginRight:20, marginTop: 3}} size={32} name='trophy' color='white' />
            <View style={[appStyles.styles.listThumbBorder, {position: 'absolute', top: -6, left: 0, borderColor: appStyles.constants.redHighlight }]}/>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={appStyles.styles.listTitle} numberOfLines={1}>{rowData.title}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={{color: 'white', textAlign: 'right'}}>{rowData.sessions} sessions, {this.transformDuration(rowData.sessionDurations)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <SegmentedControlIOS style={{marginTop:10,marginBottom:10,marginLeft:10,marginRight:10}} tintColor={appStyles.constants.redHighlight} values={['Active', 'Completed']} selectedIndex={0} onChange={ event => this.changeFilter(event.nativeEvent.selectedSegmentIndex) } />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onEndReached={this.loadMoreSessions}
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
    marginTop: 60,
    marginBottom: 50
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
