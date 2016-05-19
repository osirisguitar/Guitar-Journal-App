'use strict';

import React, {
  Component,
  View,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import appStyles from '../../styles/appStyles';

class RatingField extends Component {
  constructor (props) {
    super(props);

    this.render = this.render.bind(this);
    this.setRating = this.setRating.bind(this);

    this.state = {
      rating: this.props.value,
      iconFilled: this.createIconFilled(this.props.value)
    };
  }

  createIconFilled (rating) {
    let iconFilled = [];

    for (let i = 0; i < 5; i++) {
      iconFilled.push(rating > i);
    }

    return iconFilled;
  }

  setRating (value) {
    // Ugly event listener hack for now.
    this.props.onRatingChange(value);

    this.setState({
      rating: value,
      iconFilled: this.createIconFilled(value)
    });
  }

  render () {
    return (
      <View style={[this.props.style, styles.wrapper]}>
        <Icon color='white' size={32} name={this.state.iconFilled[0] ? 'ios-star' : 'ios-star-outline'} onPress={() => { this.setRating(1); }} />
        <Icon color='white' size={32} name={this.state.iconFilled[1] ? 'ios-star' : 'ios-star-outline'} onPress={() => { this.setRating(2); }} />
        <Icon color='white' size={32} name={this.state.iconFilled[2] ? 'ios-star' : 'ios-star-outline'} onPress={() => { this.setRating(3); }} />
        <Icon color='white' size={32} name={this.state.iconFilled[3] ? 'ios-star' : 'ios-star-outline'} onPress={() => { this.setRating(4); }} />
        <Icon color='white' size={32} name={this.state.iconFilled[4] ? 'ios-star' : 'ios-star-outline'} onPress={() => { this.setRating(5); }} />
      </View>
    );
  }
}

RatingField.propTypes = {
  onRatingChange: React.PropTypes.func,
  style: React.PropTypes.object,
  value: React.PropTypes.string
};

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    backgroundColor: appStyles.constants.gray,
    borderColor: 'gray',
    borderWidth: 1,
    paddingTop: 8
  }
});

module.exports = RatingField;
