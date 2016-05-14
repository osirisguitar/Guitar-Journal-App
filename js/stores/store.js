'use strict';

const EventEmitter = require('events').EventEmitter;
import config from '../config';
import auth from './auth';
const apiBaseUrl = config.api.baseUrl;

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
    fetch(apiBaseUrl + this.apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth.getAuthHeader()
      },
      body: JSON.stringify(item)
    })
    .then(res => {
      return res.json();
    })
    .then(resJson => {
      item.id = resJson.id;
      this.items.push(item);
      this.emitChange();
    })
    .catch(err => {
      console.error('add item error', err);
    });
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

  updateItem (updatedItem) {
    if (this.items) {
      let item = this.items.filter(item => {
        return item.id === updatedItem.id;
      })[0];

      fetch(apiBaseUrl + this.apiRoute + '/' + updatedItem.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.getAuthHeader()
        },
        body: JSON.stringify(updatedItem)
      })
      .catch(err => {
        console.error('update item error', err);
      });

      Object.assign(item, updatedItem);
      this.emitChange();
    }
  }

  getAll () {
    if (!this.items) {
      this.getFromApi();
    }

    return this.items;
  }

  refresh () {
    this.items = null;

    this.getAll();
  }

  getFromApi () {
    let store = this;

    fetch(apiBaseUrl + this.apiRoute,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.getAuthHeader()
        }
      })
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

    fetch(apiBaseUrl + this.apiRoute + '/_skip=' + this.currentLimit + '&_limit=' + this.limit,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.getAuthHeader()
        }
      })
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
        console.error('Network error', error);
      });
  }
}

module.exports = Store;
