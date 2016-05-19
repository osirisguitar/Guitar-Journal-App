'use strict';

const dispatcher = require('../dispatcher/dispatcher');
const CHANGE_EVENT = 'sessions.change';
import Store from './store';
import GoalStore from './goalStore';
import InstrumentStore from './instrumentStore';

function transformer (items) {
  return items.map(item => {
    console.log('date', item.date);

    if (item.date) {
      item.date = new Date(item.date);
    }

    return item;
  });
}

let SessionStore = new Store(CHANGE_EVENT, 'sessions', transformer);

/**
 * Register actions for SessionStore
 */
SessionStore.dispatchToken = dispatcher.register(function (action) {
  switch (action.type) {
    case 'session.add':
      SessionStore.addItem(action.session);
      SessionStore.emitChange();
      break;
    case 'session.update':
      SessionStore.updateItem(action.session);
      SessionStore.emitChange();
      break;
    case 'goal.update':
      dispatcher.waitFor([GoalStore.dispatchToken]);
      SessionStore.refresh();
      SessionStore.emitChange();
      break;
    case 'instrument.update':
      dispatcher.waitFor([InstrumentStore.dispatchToken]);
      SessionStore.refresh();
      SessionStore.emitChange();
      break;
  }
});

module.exports = SessionStore;
