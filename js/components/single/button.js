'use strict';

import React, {
  TouchableHighlight,
  Text,
  Component,
  View,
  StyleSheet
} from 'react-native';

import appStyles from '../../styles/appStyles';

class Button extends Component {
  constructor (props) {
    super(props);

    this.render = this.render.bind(this);
  }

  render () {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={{
          backgroundColor: this.props.backgroundColor,
          alignItems: 'center',
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 30,
          paddingRight: 30,
          borderRadius: 5
        }}>
        <View>
          <Text style={{color: this.props.color, fontWeight: 'bold'}}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

Button.propTypes = {
  text: React.PropTypes.string,
  onPress: React.PropTypes.func,
  style: React.PropTypes.object,
  backgroundColor: React.PropTypes.string,
  color: React.PropTypes.string
};

var styles = StyleSheet.create({
  button: {
    height: 50,
    paddingLeft: 46,
    backgroundColor: appStyles.constants.gray,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white'
  }
});

module.exports = Button;
