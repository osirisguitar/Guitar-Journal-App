'use strict';

const baseUrl = /* 'http://home.bornholm.se/';*/ 'http://192.168.88.6:8000/';

module.exports = {
  api: {
    baseUrl: baseUrl
  },
  fixImageUrl: (url) => {
    if (url && !url.startsWith('data:image/jpeg;base64,')) {
      return baseUrl + url.substring(1);
    } else {
      return url;
    }
  }
};
