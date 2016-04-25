/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import App from './js/app';
import Login from './js/components/login';
import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet
} from 'react-native';

class GuitarJournalApp extends Component {
  constructor (props) {
    super(props);
  }

  renderNavigatorScenes (route, navigator) {
    switch (route.name) {
      case 'Login':
        return <Login navigator={navigator} />;
      case 'App':
        return <App navigator={navigator} />;
    }
  }

  render () {
    return (
      <Navigator
        initialRoute={{name: 'Login', index: 0}}
        renderScene={this.renderNavigatorScenes}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromBottom,
          gestures: {} // or null
        })}
        style={styles.app}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  app: {
    backgroundColor: 'black'
  }
});


console.ignoredYellowBox = [
  'Warning: Failed propType'
  // Other warnings you don't want like 'jsSchedulingOverhead',
];

AppRegistry.registerComponent('GuitarJournalApp', () => GuitarJournalApp);
