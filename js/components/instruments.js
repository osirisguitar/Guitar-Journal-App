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

  renderRow (rowData) {
    return (
      <TouchableHighlight onPress={() => this.openInstrument(rowData)} underlayColor='#dddddd'>
        <View style={styles.listRow}>
          <Image style={styles.thumb} source={{ uri: rowData.imageUrl }} />
          <View>
            <Text style={styles.title}>{rowData.name}</Text>
            <Text>{rowData.type}</Text>
          </View>
          <View style={styles.separator}/>
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
        automaticallyAdjustContentInsets={false}
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

module.exports = Instruments;
