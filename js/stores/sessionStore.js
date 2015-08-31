'use strict';

var dispatcher = require('../dispatcher/dispatcher');
var actions = require('../actions/actions');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign')
var CHANGE_EVENT = 'sessions.change';

var sessions = null;

function addSession (session) {
  sessions.push(session);
}

var SessionStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getAll: function () {
    if (!sessions) {
      this.getFromApi();
    }

    return sessions;
  },

  getFromApi: function() {
    var store = this;

    fetch('http://localhost/api/sessions', { method: 'GET' })
      .then(function(res) {
        return res.json();
      })
      .then(function(resJson) {
        sessions = resJson;
        store.emitChange();
      });  
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