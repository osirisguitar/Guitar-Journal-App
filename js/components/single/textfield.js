'use strict';

import React, {
  TextInput,
  Text,
  Component,
  View,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import appStyles from '../../styles/appStyles';

class TextField extends Component {
  constructor (props) {
    super(props);

    this.render = this.render.bind(this);
  }

  render () {
    let textComponent;

    if (this.props.readOnly) {
      textComponent = <Text style={styles.textInput} onPress={this.props.onPress}>{this.props.value}</Text>;
    } else {
      textComponent = <TextInput
        style={[styles.textInput, this.props.multiline && styles.multiline]}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder}
        keyboardType={this.props.keyboardType}
        onChangeText={this.props.onChangeText}
        clearButtonMode={'while-editing'}
        secureTextEntry={this.props.secureTextEntry}
        value={this.props.value}
        placeholderTextColor={appStyles.constants.grayHighlight}
        multiline={this.props.multiline}
      />;
    }

    return (
      <View style={this.props.style}>
        { textComponent }
        <View style={{width: 32, position: 'absolute', top: 9, left: 8, backgroundColor: 'transparent', alignItems: 'center'}}>
          <Icon name={this.props.icon} size={32} color={appStyles.constants.grayHighlight} />
        </View>
      </View>
    );
  }
}

TextField.propTypes = {
  readOnly: React.PropTypes.bool,
  onPress: React.PropTypes.func,
  defaultValue: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  keyboardType: React.PropTypes.string,
  onChangeText: React.PropTypes.func,
  icon: React.PropTypes.string,
  style: React.PropTypes.object,
  secureTextEntry: React.PropTypes.bool,
  value: React.PropTypes.string,
  multiline: React.PropTypes.bool
};

var styles = StyleSheet.create({
  textInput: {
    height: 50,
    paddingLeft: 48,
    backgroundColor: appStyles.constants.gray,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    fontSize: 18
  },
  multiline: {
    height: 120,
    paddingTop: 5
  }
});

module.exports = TextField;
