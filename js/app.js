'use strict';

import Home from './components/home';
import Sessions from './components/sessions';
import Session from './components/session';
import Settings from './components/settings';
import actions from './actions/actions';

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
              component: Settings,
              rightButtonTitle: 'New',
              onRightButtonPress: () => this.refs.sessionNav.push({ title: 'Add goal', component: Goal })
            }}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Settings"
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            ref='sessionNav'
            initialRoute={{
              title: 'Settings',
              component: Settings
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
