'use strict';

import Home from './components/home';
import Sessions from './components/sessions';
import Sessions2 from './components/sessions2';
import Session from './components/session';
import Goals from './components/goals';
import Goal from './components/goal';
import Profile from './components/profile';

// import Icon from 'react-native-vector-icons/Ionicons';
// const Icon = require('react-native-vector-icons/Ionicons');

import React, {
  Component,
  NavigatorIOS,
  TabBarIOS,
  StyleSheet,
  View
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
            barTintColor={'black'}
            titleTextColor={'#BD934F'}
            tintColor={'#BD934F'}
            itemWrapperStyle={{backgroundColor: 'black'}}
            initialRoute={{
              title: 'OSIRIS GUITAR Journal',
              component: Home
            }}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Sessions'
          selected={this.state.selectedTab === 'sessions'}
          onPress={() => {
            this.setState({
              selectedTab: 'sessions'
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref='sessionNav'
            barTintColor={'black'}
            titleTextColor={'#BD934F'}
            tintColor={'#BD934F'}
            itemWrapperStyle={{backgroundColor: 'black'}}
            initialRoute={{
              title: 'Sessions',
              component: Sessions,
              rightButtonTitle: 'New',
              onRightButtonPress: () => this.refs.sessionNav.push({ title: 'Add session', component: Session, passProps: { session: {}, editMode: true } })
            }}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Sessions2'
          selected={this.state.selectedTab === 'sessions2'}
          onPress={() => {
            this.setState({
              selectedTab: 'sessions2'
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref='sessionNav'
            barTintColor={'black'}
            titleTextColor={'#BD934F'}
            tintColor={'#BD934F'}
            itemWrapperStyle={{backgroundColor: 'black'}}
            initialRoute={{
              title: 'Sessions',
              component: Sessions2,
              rightButtonTitle: 'New',
              onRightButtonPress: () => this.refs.sessionNav.push({ title: 'Add session', component: Session, passProps: { session: {}, editMode: true } })
            }}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Goals'
          selected={this.state.selectedTab === 'goals'}
          onPress={() => {
            this.setState({
              selectedTab: 'goals'
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref='goalNav'
            barTintColor={'black'}
            titleTextColor={'#BD934F'}
            tintColor={'#BD934F'}
            itemWrapperStyle={{backgroundColor: 'black'}}
            initialRoute={{
              title: 'Goals',
              component: Goals,
              rightButtonTitle: 'New',
              onRightButtonPress: () => this.refs.goalNav.push({ title: 'Add goal', component: Goal, passProps: { goal: {}, editMode: true } })
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
            barTintColor={'black'}
            titleTextColor={'#BD934F'}
            tintColor={'#BD934F'}
            itemWrapperStyle={{backgroundColor: 'black'}}
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
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});

module.exports = App;
