'use strict';

const dispatcher = require('../dispatcher/dispatcher');
const CHANGE_EVENT = 'goals.change';
import Store from './store';

let GoalStore = new Store(CHANGE_EVENT, 'goals');

/**
 * Register actions for GoalStore
 */
dispatcher.register(function (action) {
  switch (action.actionType) {
    case 'goal.add':
      GoalStore.addItem(action.goal);
      GoalStore.emitChange();
      break;
  }
});

module.exports = GoalStore;
