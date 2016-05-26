'use strict';

const dispatcher = require('../dispatcher/dispatcher');
const CHANGE_EVENT = 'sessions.change';
import Store from './store';

function transformer (items) {
  return items.map(item => {
    if (item.date) {
      item.date = new Date(item.date);
    }

    return item;
  });
}

console.log('Creating SessionStore');

let SessionStore = new Store(CHANGE_EVENT, 'sessions', transformer);

import GoalStore from './goalStore';
import InstrumentStore from './instrumentStore';

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

console.log('SessionStore', SessionStore);

export default SessionStore;
