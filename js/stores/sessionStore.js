'use strict';

var dispatcher = require('../dispatcher/dispatcher');
var actions = require('../actions/actions');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign')
var CHANGE_EVENT = 'sessions.change';

var sessions = null;
var chunkSize = 20;
var currentLimit = 20;

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

    fetch('http://192.168.110.187/api/sessions', { method: 'GET' })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        sessions = resJson;
        store.emitChange();
      });  
  },

  loadMoreSessions: function() {
    var store = this;

    fetch('http://192.168.110.187/api/sessions/' + currentLimit, { method: 'GET' })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        sessions = sessions.concat(resJson);
        currentLimit += chunkSize;
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