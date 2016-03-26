'use strict';

const dispatcher = require('../dispatcher/dispatcher');

let actions = {
  addSession: function (session) {
    dispatcher.dispatch({
      actionType: 'session.add',
      session: session
    });
  },
  addGoal: function (goal) {
    dispatcher.dispatch({
      actionType: 'goal.add',
      goal: goal
    });
  }
};

module.exports = actions;
