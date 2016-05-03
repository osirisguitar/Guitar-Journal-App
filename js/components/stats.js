'use strict';

import React, {
  StyleSheet,
  ListView,
  View,
  Component
} from 'react-native';

class Stats extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <View/>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  },
  listRow: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    margin: 2,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1
  },
  backgroundImage: {
    flex: 1,
    /* width: null,
    height: null,*/
    //opacity: 0.3
  },
  separator: {
    backgroundColor: 'gray'
  },
  thumb: {
    width: 50,
    height: 50,
    marginRight: 5
  },
  title: {
    fontWeight: 'bold',
    color: 'white'
  }
});

module.exports = Stats;
