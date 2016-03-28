'use strict';

const EventEmitter = require('events').EventEmitter;
const apiBaseUrl = 'http://192.168.1.101:3000/';

class Store {
  constructor (changeEvent, apiRoute, transformer) {
    this.changeEvent = changeEvent;
    this.items = null;
    this.apiRoute = apiRoute;
    this.currentLimit = 10;
    this.limit = 10;
    this.eventEmitter = new EventEmitter();
    this.transformer = transformer;
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
    let store = this;

    fetch(apiBaseUrl + this.apiRoute, { method: 'GET' })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        if (store.transformer) {
          store.items = store.transformer(resJson);
        } else {
          store.items = resJson;
        }
        store.emitChange();
      })
      .catch(error => {
        console.log('Network error', error);
      });
  }

  loadMoreFromApi () {
    let store = this;

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
