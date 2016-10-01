'use strict';

const dispatcher = require('../dispatcher/dispatcher');
const CHANGE_EVENT = 'profile.change';
import Store from './store';

let ProfileStore = new Store(CHANGE_EVENT, 'profile');

/**
 * Register actions for ProfileStore
 */
ProfileStore.dispatchToken = dispatcher.register(function (action) {
  switch (action.type) {
    case 'profile.add':
      ProfileStore.addItem(action.instrument);
      ProfileStore.emitChange();
      break;
    case 'profile.update':
      ProfileStore.updateItem(action.instrument);
      ProfileStore.emitChange();
      break;
  }
});

module.exports = ProfileStore;
