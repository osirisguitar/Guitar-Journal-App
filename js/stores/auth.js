'use strict';

import config from '../config';

let authHeader;

function login (userName, password) {
  return fetch(config.api.baseUrl + 'token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userName,
        password: password
      })
    })
    .then(res => {
      return res.json();
    })
    .then(resJson => {
      authHeader = 'Bearer ' + resJson.userToken;
      return true;
    });
}

function loginFaceBook (fbAccessToken) {
  return fetch(config.api.baseUrl + 'token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fbAccessToken: fbAccessToken
      })
    })
    .then(res => {
      return res.json();
    })
    .then(resJson => {
      authHeader = 'Bearer ' + resJson.userToken;
      return true;
    });
}

function getAuthHeader () {
  return authHeader;
}

function logout () {
  authHeader = undefined;
}

module.exports = {
  getAuthHeader,
  login,
  loginFaceBook,
  logout
};
