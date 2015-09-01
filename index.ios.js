/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./js/components/login');
var App = require('./js/app');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  NavigatorIOS
} = React;

var GuitarJournalApp = React.createClass({
  renderNavigatorScenes: function (route, navigator) {
    switch (route.name) {
      case 'Login':
        return <Login navigator={navigator} />
      case 'App':
        return <App navigator={navigator} />
    } 
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{name: 'Login', index: 0}}
        renderScene={this.renderNavigatorScenes}      
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromBottom,
          gestures: {}, // or null
        })}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GuitarJournalApp', () => GuitarJournalApp);
