'use strict';

var dispatcher = require('../dispatcher/dispatcher');
var actions = require('../actions/actions');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign')
var CHANGE_EVENT = 'sessions.change';

var sessions = [{
  id: 123,
  name: 'First session'
}];

function addSession (session) {
  sessions.push(session);
}

var SessionStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getAll: function () {
      return sessions
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


/**
 * Register actions for SessionStore
 */
dispatcher.register(function (action) {
  switch (action.actionType) {
    case 'session.add':
      addSession(action.session);
      SessionStore.emitChange();
      break;
  }
});

module.exports = SessionStore;