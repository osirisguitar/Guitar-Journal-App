'use strict';

const dispatcher = require('../dispatcher/dispatcher');
const CHANGE_EVENT = 'instruments.change';
import Store from './store';

let InstrumentStore = new Store(CHANGE_EVENT, 'instruments');

/**
 * Register actions for InstrumentStore
 */
dispatcher.register(function (action) {
  switch (action.actionType) {
    case 'instrument.add':
      InstrumentStore.addItem(action.instrument);
      InstrumentStore.emitChange();
      break;
  }
});

module.exports = InstrumentStore;
