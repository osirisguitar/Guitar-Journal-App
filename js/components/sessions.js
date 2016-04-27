'use strict';

import SessionStore from '../stores/sessionStore';
import moment from 'moment';
import Session from './session';
import appStyles from '../styles/appStyles';
import Icon from 'react-native-vector-icons/Ionicons';

import React, {
  StyleSheet,
  Text,
  ListView,
  View,
  StatusBar,
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

  getStars (rating) {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(i < rating);
    }

    let key = 0;
    return stars.map(star => {
      if (star) {
        return <Icon name='ios-star' size={22} key={key++} color='white' />;
      } else {
        return <Icon name='ios-star-outline' size={22} key={key++} color='white' />;
      }
    });
  }

  renderRow (rowData) {
    var date = moment(rowData.date);
    return (
      <TouchableHighlight onPress={() => this.openSession(rowData)} underlayColor={appStyles.constants.green}>
        <View style={styles.listRow}>
          <Image style={styles.thumb} source={{ uri: rowData.instrument ? rowData.instrument.imageUrl : null }}>
            <View style={styles.thumbBorder}/>
          </Image>
          <View style={{ flex: 1 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'white'}}>{date.format('ddd D MMM')}</Text>
              <Text style={{color: 'white', textAlign: 'right'}}>{rowData.goal.title} ({rowData.location})</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>{rowData.duration} minutes</Text>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                {this.getStars(rowData.rating)}
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onEndReached={this.loadMoreSessions}
          contentInset={{bottom: 49}}
          automaticallyAdjustContentInsets
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
  },
  listRow: {
    flex: 1,
    height: 80,
    flexDirection: 'row',
    borderBottomColor: appStyles.constants.gray,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  separator: {
    backgroundColor: appStyles.constants.gray
  },
  thumb: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25
  },
  thumbBorder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: appStyles.constants.green,
    marginRight: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  }
});

module.exports = Sessions;
