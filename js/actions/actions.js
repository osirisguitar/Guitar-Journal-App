'use strict';

const dispatcher = require('../dispatcher/dispatcher');

let actions = {
  addSession: function (session) {
    dispatcher.dispatch({
      actionType: 'session.add',
      session: session
    });
  },
  updateSession: function (session) {
    dispatcher.dispatch({
      actionType: 'session.update',
      session: session
    });
  },
  addGoal: function (goal) {
    dispatcher.dispatch({
      actionType: 'goal.add',
      goal: goal
    });
  },
  updateGoal: function (goal) {
    dispatcher.dispatch({
      actionType: 'goal.update',
      goal: goal
    });
  },
  addInstrument: function (instrument) {
    dispatcher.dispatch({
      actionType: 'instrument.add',
      instrument: instrument
    });
  },
  updateInstrument: function (instrument) {
    dispatcher.dispatch({
      actionType: 'instrument.update',
      instrument: instrument
    });
  }
};

module.exports = actions;
