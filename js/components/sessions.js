'use strict';

var React = require('react-native');
var SessionStore = require('../stores/sessionStore');

var {
  StyleSheet,
  Text,
  ListView,
  View,
  Component,
} = React; 

var Sessions = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(SessionStore.getAll()),
    };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this.sessionsChanged);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this.sessionsChanged);
  },

  sessionsChanged: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({ dataSource: ds.cloneWithRows(SessionStore.getAll()) });
  },

  renderRow: function (rowData) {
    return(
        <View>
          <Text>rowData</Text>
        </View>
      /*<TouchableHighlight onPress={() => this.rowPressed(rowData.guid)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>£{price}</Text>
              <Text style={styles.title} 
                    numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>*/
    );
  },

  render: function () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <View style={styles.listRow}><Text>{rowData}</Text></View>}
      />
    );
  },
});

var styles = StyleSheet.create({
  listRow: {
    height: 40
  }
});


module.exports = Sessions;