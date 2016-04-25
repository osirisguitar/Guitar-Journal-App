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

let dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => { return row1 !== row2; }
});

class Sessions extends Component {
  constructor (props) {
    super(props);

    let sessions = SessionStore.getAll();

    this.renderRow = this.renderRow.bind(this);
    this.openSession = this.openSession.bind(this);
    this.sessionsChanged = this.sessionsChanged.bind(this);

    this.state = {
      dataSource: sessions ? dataSource.cloneWithRows(sessions) : dataSource
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

    if (loadedSessions) {
      this.setState({ dataSource: dataSource.cloneWithRows(loadedSessions) });
    }
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
        passProps: { session: session, editMode: true }
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
          <View>
            <Text style={styles.title}>{date.format('L')}: {rowData.duration} minutes</Text>
            <Text>{rowData.goal.title} ({rowData.location})</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={{ uri: 'http://chrislordalge.com/cms/wp-content/uploads/MIX-LA-3.jpg' }} style={styles.backgroundImage}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onEndReached={this.loadMoreSessions}
          contentInset={{bottom: 49}}
          automaticallyAdjustContentInsets={false}
          style={{backgroundColor: 'rgba(0,0,0,0.6)',marginLeft: 30,marginRight: 30}}
        />
        </Image>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    color: 'white'
  },
  listRow: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    margin: 2,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    color: 'white'
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

module.exports = Sessions;
