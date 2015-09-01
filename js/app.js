'use strict';

var React = require('react-native');
var Home = require('./components/home');
var Sessions = require('./components/sessions');
var Session = require('./components/session');
var Settings = require('./components/settings');
var actions = require('./actions/actions');

var {
  AppRegistry,
  Component,
  NavigatorIOS,
  TabBarIOS,
  StyleSheet,
  View,
  Text
} = React;

// This is needed because the actual image may not exist as a file and
// is used by the native code to load a system image.
// TODO(nicklockwood): How can this fit our require system?
function _ix_DEPRECATED(imageUri) {
  return {
    uri: imageUri,
    isStatic: true,
  };
}

var App = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'home'
    };
  },

  render() {
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item title="Home" 
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
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
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = App;
//AppRegistry.registerComponent('GuitarJournalApp', () => GuitarJournalApp);
