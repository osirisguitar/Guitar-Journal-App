'use strict';

import Home from './components/home';
import Sessions from './components/sessions';
import Stats from './components/stats';
import Session from './components/session';
import Goals from './components/goals';
import Goal from './components/goal';
import Instrument from './components/instrument';
import Profile from './components/profile';
import appStyles from './styles/appStyles';

import Icon from 'react-native-vector-icons/Ionicons';
// const Icon = require('react-native-vector-icons/Ionicons');

import React, {
  Component,
  NavigatorIOS,
  TabBarIOS,
  StyleSheet
} from 'react-native';

/* const tintColors = {
  home: appStyles.constants.blue,
  sessions: appStyles.constants.green,
  stats: appStyles.constants.orange,
  goals: appStyles.constants.red,
  profile: appStyles.constants.gray
};*/

const tintColors = {
  home: appStyles.constants.bgColor,
  sessions: appStyles.constants.bgColor,
  stats: appStyles.constants.bgColor,
  goals: appStyles.constants.bgColor,
  profile: appStyles.constants.bgColor
};

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    };
  }

  render () {
    return (
      <TabBarIOS barTintColor={tintColors[this.state.selectedTab]} tintColor={'white'}>
        <Icon.TabBarItem
          title='Home'
          titleColor='white'
          iconName='ios-home'
          selectedIconName='ios-home'
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home'
            });
          }}>
          <NavigatorIOS
            ref = 'homeNav'
            style={styles.container}
            barTintColor={appStyles.constants.blue}
            titleTextColor={'white'}
            tintColor={'white'}
            itemWrapperStyle={{backgroundColor: appStyles.constants.bgColor}}
            initialRoute={{
              title: 'OSIRIS GUITAR Journal',
              component: Home
            }}/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='Sessions'
          iconName='ios-list'
          selectedIconName='ios-list'
          selected={this.state.selectedTab === 'sessions'}
          onPress={() => {
            this.setState({
              selectedTab: 'sessions'
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref='sessionNav'
            barTintColor={appStyles.constants.green}
            titleTextColor={'white'}
            tintColor={'white'}
            itemWrapperStyle={{backgroundColor: appStyles.constants.bgColor}}
            initialRoute={{
              title: 'Sessions',
              component: Sessions,
              rightButtonTitle: 'New',
              onRightButtonPress: () => this.refs.sessionNav.push({ title: 'Add session', component: Session, passProps: { session: {}, editMode: true } })
            }}/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='Stats'
          iconName='stats-bars'
          selectedIconName='stats-bars'
          selected={this.state.selectedTab === 'stats'}
          onPress={() => {
            this.setState({
              selectedTab: 'stats'
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref='statsNav'
            barTintColor={appStyles.constants.orange}
            titleTextColor={'white'}
            tintColor={'white'}
            itemWrapperStyle={{backgroundColor: appStyles.constants.bgColor}}
            initialRoute={{
              title: 'Stats',
              component: Stats
            }}/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='Goals'
          iconName='trophy'
          selectedIconName='trophy'
          selected={this.state.selectedTab === 'goals'}
          onPress={() => {
            this.setState({
              selectedTab: 'goals'
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref='goalNav'
            barTintColor={appStyles.constants.red}
            titleTextColor={'white'}
            tintColor={'white'}
            itemWrapperStyle={{backgroundColor: appStyles.constants.bgColor}}
            initialRoute={{
              title: 'Goals',
              component: Goals,
              rightButtonTitle: 'New',
              onRightButtonPress: () => this.refs.goalNav.push({ title: 'Add goal', component: Goal, passProps: { goal: {}, editMode: true } })
            }}/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='Profile'
          iconName='person'
          selectedIconName='person'
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.setState({
              selectedTab: 'profile'
            });
          }}>
          <NavigatorIOS
            barTintColor={appStyles.constants.gray}
            titleTextColor={'white'}
            tintColor={'white'}
            itemWrapperStyle={{backgroundColor: appStyles.constants.bgColor}}
            style={styles.container}
            ref='profileNav'
            initialRoute={{
              title: 'Profile',
              component: Profile,
              onRightButtonPress: () => this.refs.profileNav.push({ title: 'Add instrument', component: Instrument, passProps: { instrument: {}, editMode: true } })
            }}/>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});

module.exports = App;
