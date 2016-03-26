'use strict';

const dispatcher = require('../dispatcher/dispatcher');
const CHANGE_EVENT = 'sessions.change';
import Store from './store';

let SessionStore = new Store(CHANGE_EVENT, 'sessions');

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
