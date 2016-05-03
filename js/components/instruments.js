'use strict';

import InstrumentStore from '../stores/instrumentStore';
import Instrument from './instrument';

import React, {
  StyleSheet,
  Text,
  ListView,
  View,
  Component,
  TouchableHighlight,
  Image
} from 'react-native';

import appStyles from '../styles/appStyles';
import config from '../config';

let dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => { return row1 !== row2; }
});

class Instruments extends Component {
  constructor (props) {
    super(props);

    let instruments = InstrumentStore.getAll();
    console.log('instruments', instruments);

    this.renderRow = this.renderRow.bind(this);
    this.openInstrument = this.openInstrument.bind(this);
    this.instrumentsChanged = this.instrumentsChanged.bind(this);

    this.state = {
      dataSource: instruments ? dataSource.cloneWithRows(instruments) : dataSource
    };
  }

  componentDidMount () {
    // Dumb closure needed because of scope set by event callback
    InstrumentStore.addChangeListener(this.instrumentsChanged);
  }

  componentWillUnmount () {
    InstrumentStore.removeChangeListener(this.instrumentsChanged);
  }

  instrumentsChanged () {
    let loadedInstruments = InstrumentStore.getAll();
    console.log('instruments are now', loadedInstruments);
    this.setState({ dataSource: dataSource.cloneWithRows(loadedInstruments) });
  }

  openInstrument (instrument) {
    this.props.navigator.push({
      title: 'Instrument',
      component: Instrument,
      passProps: { instrument: instrument },
      rightButtonTitle: 'Edit',
      onRightButtonPress: () => this.props.navigator.push({
        title: 'Edit Instrument',
        component: Instrument,
        passProps: { instrument: instrument, editMode: true }
      })
    });
  }

  loadMoreInstruments () {
    InstrumentStore.loadMoreFromApi();
  }

  transformDuration (minutes) {
    if (minutes < 60) {
      return minutes + ' min';
    } else {
      return Math.floor(minutes / 60) + ' h ' + minutes % 60 + ' min';
    }
  }

  renderRow (rowData) {
    return (
      <TouchableHighlight onPress={() => this.openInstrument(rowData)} underlayColor={appStyles.constants.gray}>
        <View style={appStyles.styles.listRow}>
          <Image style={appStyles.styles.listThumb} source={{ uri: config.fixImageUrl(rowData.imageUrl) }} onError={(event) => { console.log('Error!', event.nativeEvent.error); }} onLoadStart={(event) => { console.log('Loading image', event); }} onLoadEnd={(event) => { console.log('Image loaded', event); }}>
            <View style={appStyles.styles.listThumbBorder}/>
          </Image>
          <View style={{ flex: 1 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'white'}}>{rowData.type}</Text>
              <Text style={{color: 'white'}}>{this.transformDuration(rowData.sessionDurations)}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={appStyles.styles.listTitle}>{rowData.name}</Text>
              <Text style={appStyles.styles.listTitle}>{rowData.sessions} sessions</Text>             
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        onEndReached={this.loadMoreInstruments}
        contentInset={{bottom: 49}}
      />
    );
  }
}

Instruments.propTypes = {
  navigator: React.PropTypes.object
};

module.exports = Instruments;
