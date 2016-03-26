'use strict';

import SessionStore from '../stores/sessionStore';
import moment from 'moment';
import Session from './session';

import React, {
  StyleSheet,
  Text,
  ListView,
  View,
  Component,
  TouchableHighlight,
  Image
} from 'react-native';

class Sessions extends Component {
  constructor (props) {
    super(props);

    SessionStore.getAll();

    this.renderRow = this.renderRow.bind(this);
    this.openSession = this.openSession.bind(this);
    this.sessionsChanged = this.sessionsChanged.bind(this);

    this.state = {
      sessions: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount () {
    // Dumb closure needed because of scope set by event callback
    SessionStore.addChangeListener(this.sessionsChanged);
  }

  componentWillUnmount () {
    SessionStore.removeChangeListener(this.sessionsChanged);
  }

  sessionsChanged () {
    let loadedSessions = SessionStore.getAll();
    this.setState({ sessions: this.state.sessions.cloneWithRows(loadedSessions) });
  }

  openSession (session) {
    this.props.navigator.push({
      title: 'Session',
      component: Session,
      passProps: { session: session },
      rightButtonTitle: 'Edit',
      onRightButtonPress: () => this.props.navigator.push({
        title: 'Edit Session',
        component: Session,
        passProps: { session: session }
      })
    });
  }

  loadMoreSessions () {
    SessionStore.loadMoreFromApi();
  }

  renderRow (rowData) {
    var date = moment(rowData.date);
    return (
      <TouchableHighlight onPress={() => this.openSession(rowData)} underlayColor='#dddddd'>
        <View style={styles.listRow}>
          <Image style={styles.thumb} source={{ uri: rowData.instrument ? rowData.instrument.imageUrl : null }} />
          <View>
            <Text style={styles.title}>{date.format('L')}: {rowData.length} minutes</Text>
            <Text>{rowData.goal.title} ({rowData.location})</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <ListView
        dataSource={this.state.sessions}
        renderRow={this.renderRow}
        onEndReached={this.loadMoreSessions}
      />
    );
  }
}

let styles = StyleSheet.create({
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

module.exports = Sessions;
