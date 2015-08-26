'use strict';

var dispatcher = require('../dispatcher/dispatcher');

var actions = {
  addSession: function (session) {
    dispatcher.dispatch({
      actionType: 'session.add',
      session: session
    });
  },
};

module.exports = actions;