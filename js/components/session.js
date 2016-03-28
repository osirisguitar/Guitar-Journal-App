'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Component,
  Picker
} from 'react-native';

import InstrumentStore from '../stores/instrumentStore';
import tcomb from 'tcomb-form-native';
const Form = tcomb.form.Form;

let sessionModel = tcomb.struct({
  date: tcomb.Date,
  length: tcomb.Number,
  rating: tcomb.Number
});

let formOptions = {
  fields: {
    date: {
      mode: 'date'
    }
  }
};

class Session extends Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      session: this.props.session,
      instruments: InstrumentStore.getAll()
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
    this.setState({ instruments: InstrumentStore.getAll() });
  }

  onChange (value) {
    this.setState({ session: value });
  }

  renderInstruments (instruments) {
    console.log('instruments', instruments);
    if (instruments) {
      return (
        instruments.map(instrument => {
          <Picker.Item key={instrument.id.toString()} value={instrument.id.toString()} label={instrument.name} />
        })
      );
    } else {
      return;
    }
  }

  render () {
    if (this.props.session) {
      if (this.props.editMode) {
        return (
          <View style={styles.container}>
            <Form type={sessionModel} value={this.state.session} options={formOptions} onChange={this.onChange} />
            <Text>Date</Text><TextInput value={this.props.session.date} style={styles.textInput}/>
            <Text>Length</Text><TextInput value={this.props.session.length.toString()} style={styles.textInput}/>
            <Text>Instrument</Text><TextInput value={this.props.session.instrument.name} style={styles.textInput}/>
            <Text>Instrument</Text>
            <Picker selectedValue={this.props.session.instrument.id} >
              {
                this.state.instruments.map(instrument => (
                  <Picker.Item key={instrument.id} value={instrument.id} label={instrument.name} style={{ height: 50 }}/>
                ))
              }
            </Picker>
            <Text>Goal</Text><TextInput value={this.props.session.goal.title} style={styles.textInput}/>
            <Text>Rating</Text><TextInput value={this.props.session.rating.toString()} style={styles.textInput}/>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: this.props.session.instrument ? this.props.session.instrument.imageUrl : null }} />
            <View>
              <Text>{this.props.session.date}</Text>
              <Text>{this.props.session.length}</Text>
              <Text>{this.props.session.instrument.name}</Text>
              <Text>{this.props.session.goal.title}</Text>
              <Text>{this.props.session.rating}</Text>
            </View>
          </View>
        );
      }
    } else {
      return (
        <View/>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    flexDirection: 'column'
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: 5,
    marginRight: 5
  },
  textInput: { height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }
});

module.exports = Session;
