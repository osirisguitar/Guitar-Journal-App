'use strict';

const dispatcher = require('../dispatcher/dispatcher');
const CHANGE_EVENT = 'goals.change';
import Store from './store';
import SessionStore from './sessionStore';

let GoalStore = new Store(CHANGE_EVENT, 'goals');

console.log('SessionStore token (goals)', SessionStore);

/**
 * Register actions for GoalStore
 */
GoalStore.dispatchToken = dispatcher.register(function (action) {
  switch (action.type) {
    case 'goal.add':
      GoalStore.addItem(action.goal);
      GoalStore.emitChange();
      break;
    case 'goal.update':
      GoalStore.updateItem(action.goal);
      GoalStore.emitChange();
      break;
    case 'session.add':
    case 'session.update':
      dispatcher.waitFor([SessionStore.dispatchToken]);
      GoalStore.refresh();
      GoalStore.emitChange();
      break;
  }
});

export default GoalStore;
