'use strict';

var React = require('react-native');
var SessionStore = require('../stores/sessionStore');
var moment = require('moment');
var Session = require('./session');
//var Router = require('react-native-router');

var {
  StyleSheet,
  Text,
  ListView,
  View,
  Component,
  TouchableHighlight,
  Image,
  Navigator
} = React; 

var Sessions = React.createClass({
  getInitialState: function () {
    SessionStore.getAll();

    return {
      sessions: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this.sessionsChanged);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this.sessionsChanged);
  },

  sessionsChanged: function() {
    var sessions = SessionStore.getAll();
    this.setState({ sessions: this.state.sessions.cloneWithRows(sessions) });
  },

  openSession: function(session) {
    this.props.navigator.push({ title: 'Session', component: Session, passProps: { session: session } });
  },

  loadMoreSessions: function() {
    SessionStore.loadMoreSessions();
  },

  renderRow: function (rowData) {
    var date = moment(rowData.date);
    return(
      <TouchableHighlight onPress={() => this.openSession(rowData)} underlayColor='#dddddd'>
        <View style={styles.listRow}>
          <Image style={styles.thumb} source={{ uri: (rowData.instrument && rowData.instrument.imageFile) ? 'http://localhost/api/images/' + rowData.instrument.imageFile + '.jpg' : null }} />
          <View>
            <Text style={styles.title}>{date.format('L')}: {rowData.length} minutes</Text>
            <Text>{rowData.goal.title} ({rowData.location})</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  },

  render: function () {
    return (
      <ListView
        dataSource={this.state.sessions}
        renderRow={this.renderRow}
        onEndReached={this.loadMoreSessions}
      />
    );
  },
});

var styles = StyleSheet.create({
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
  },
});


module.exports = Sessions;