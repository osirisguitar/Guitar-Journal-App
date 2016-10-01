'use strict';

const baseUrl = 'http://api.journal.osirisguitar.com/'; //  'http://192.168.1.101:8000/'; */ 'http://192.168.88.10:8000/';

module.exports = {
  api: {
    baseUrl: baseUrl
  },
  fixImageUrl: (url) => {
    if (url && !url.startsWith('data:image/jpeg;base64,')) {
      console.log('returning', baseUrl + url.substring(1));
      return baseUrl + url.substring(1);
    } else {
      return url;
    }
  }
};
