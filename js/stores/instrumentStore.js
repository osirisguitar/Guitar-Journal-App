'use strict';

const dispatcher = require('../dispatcher/dispatcher');
const CHANGE_EVENT = 'instruments.change';
import Store from './store';

let InstrumentStore = new Store(CHANGE_EVENT, 'instruments');

/**
 * Register actions for InstrumentStore
 */
InstrumentStore.dispatchToken = dispatcher.register(function (action) {
  switch (action.type) {
    case 'instrument.add':
      InstrumentStore.addItem(action.instrument);
      InstrumentStore.emitChange();
      break;
    case 'instrument.update': {
      InstrumentStore.updateItem(action.instrument);
      InstrumentStore.emitChange();
    }
  }
});

module.exports = InstrumentStore;
