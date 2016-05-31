'use strict';

const dispatcher = require('../dispatcher/dispatcher');
const CHANGE_EVENT = 'instruments.change';
import Store from './store';
import SessionStore from './sessionStore';

let InstrumentStore = new Store(CHANGE_EVENT, 'instruments');

console.log('SessionStore token (instruments)', SessionStore);

/**
 * Register actions for InstrumentStore
 */
InstrumentStore.dispatchToken = dispatcher.register(function (action) {
  switch (action.type) {
    case 'instrument.add':
      InstrumentStore.addItem(action.instrument);
      InstrumentStore.emitChange();
      break;
    case 'instrument.update':
      InstrumentStore.updateItem(action.instrument);
      InstrumentStore.emitChange();
      break;
    case 'session.add':
    case 'session.update':
      dispatcher.waitFor([SessionStore.dispatchToken]);
      InstrumentStore.refresh();
      InstrumentStore.emitChange();
      break;
  }
});

module.exports = InstrumentStore;
