'use strict';

import SessionStore from '../stores/sessionStore';
import moment from 'moment';
import Session from './session';
import appStyles from '../styles/appStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../config';

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
        <View style={appStyles.styles.listRow}>
          <Image style={appStyles.styles.listThumb} onError={(e) => { console.log('Error', e.nativeEvent.error); }} source={{ uri: rowData.instrument ? config.fixImageUrl(rowData.instrument.imageUrl) : null }}>
            <View style={appStyles.styles.listThumbBorder}/>
          </Image>
          <View style={{ flex: 1 }}>          
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'white'}}>{date.calendar()}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={appStyles.styles.listTitle}>{rowData.duration} minutes</Text>
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
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
}

Sessions.propTypes = {
  navigator: React.PropTypes.object
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    marginBottom: 50
  }
});

module.exports = Sessions;
