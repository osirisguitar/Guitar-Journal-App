'use strict';

import Home from './components/home';
import Sessions from './components/sessions';
import Session from './components/session';
import Goals from './components/goals';
import Goal from './components/goal';
import Profile from './components/profile';

//import Icon from 'react-native-vector-icons/Ionicons';
//const Icon = require('react-native-vector-icons/Ionicons');

import React, {
  Component,
  NavigatorIOS,
  TabBarIOS,
  StyleSheet
} from 'react-native';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    };
  }

  render () {
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title='Home'
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home'
            });
          }}>
          <NavigatorIOS
            ref = 'homeNav'
            style={styles.container}
            initialRoute={{
              title: 'OSIRIS GUITAR Journal',
              component: Home
            }}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Sessions"
          selected={this.state.selectedTab === 'sessions'}
          onPress={() => {
            this.setState({
              selectedTab: 'sessions',
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref='sessionNav'
            initialRoute={{
              title: 'Sessions',
              component: Sessions,
              rightButtonTitle: 'New',
              onRightButtonPress: () => this.refs.sessionNav.push({ title: 'Add session', component: Session })
            }}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Goals"
          selected={this.state.selectedTab === 'goals'}
          onPress={() => {
            this.setState({
              selectedTab: 'goals',
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref='goalNav'
            initialRoute={{
              title: 'Goals',
              component: Goals,
              rightButtonTitle: 'New',
              onRightButtonPress: () => this.refs.sessionNav.push({ title: 'Add goal', component: Goal })
            }}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Profile'
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.setState({
              selectedTab: 'profile'
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref='profileNav'
            initialRoute={{
              title: 'Profile',
              component: Profile
            }}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = App;
