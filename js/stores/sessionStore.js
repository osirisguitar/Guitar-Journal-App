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

let SessionStore = new Store(CHANGE_EVENT, 'sessions', transformer);

/**
 * Register actions for SessionStore
 */
dispatcher.register(function (action) {
  switch (action.actionType) {
    case 'session.add':
      SessionStore.addItem(action.session);
      SessionStore.emitChange();
      break;
  }
});

module.exports = SessionStore;
