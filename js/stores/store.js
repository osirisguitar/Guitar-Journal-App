'use strict';

const EventEmitter = require('events').EventEmitter;
const apiBaseUrl = 'http://62.72.232.84:3000/';

class Store {
  constructor (changeEvent, apiRoute) {
    this.changeEvent = changeEvent;
    this.items = null;
    this.apiRoute = apiRoute;
    this.currentLimit = 10;
    this.limit = 10;
    this.eventEmitter = new EventEmitter();
  }

  addItem (item) {
    this.items.push(item);
  }

  emitChange () {
    this.eventEmitter.emit(this.changeEvent);
  }

  addChangeListener (callback) {
    this.eventEmitter.on(this.changeEvent, callback);
  }

  removeChangeListener (callback) {
    this.eventEmitter.removeListener(this.changeEvent, callback);
  }

  getAll () {
    if (!this.items) {
      this.getFromApi();
    }

    return this.items;
  }

  getFromApi () {
    var store = this;

    fetch(apiBaseUrl + this.apiRoute, { method: 'GET' })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        store.items = resJson;
        store.emitChange();
      })
      .catch(error => {
        console.log('Network error', error);
      });
  }

  loadMoreFromApi () {
    var store = this;

    fetch(apiBaseUrl + this.apiRoute + '/_skip=' + this.currentLimit + '&_limit=' + this.limit, { method: 'GET' })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        if (Array.isArray(resJson) && resJson.length > 1) {
          store.items = store.items.concat(resJson);
          store.currentLimit += resJson.length;
          store.emitChange();
        }
      })
      .catch(error => {
        console.log('Network error', error);
      });
  }
}

module.exports = Store;
