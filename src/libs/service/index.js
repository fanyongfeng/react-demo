/**
 * Handle all rest Apis.
 */
// https://www-stage.tutormeetplus.com/v2/tdashboard/roomlist
// https://www2.tutormeetplus.com/v2/tdashboard/roomlist

import Base64 from '../encrypt/Base64'

let apiHost = 'https://www2.tutormeetplus.com/v2/tdashboard';
if (process.env.DEPLOYMENT_ENV === 'qa') apiHost = 'https://www-qa.tutormeetplus.com/v2/tdashboard';
else if (process.env.DEPLOYMENT_ENV === 'stage') apiHost = 'https://www-stage.tutormeetplus.com/v2/tdashboard';

let areaHost = 'http://172.16.4.185:6006'

function make_basic_auth(user, password) {
  var tok = user + ':' + password;
  var hash = Base64.encode(tok);
  return "Basic " + hash;
}

var auth = make_basic_auth('tms', '123465');

var headers = new Headers();
headers.append('Authorization', auth);
headers.append("Content-Type", "application/json");

export default {

  login(body, success, error) {
    fetch(`${apiHost}/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(function (response) {
      if (response.headers.get("content-type").includes("application/json")) {
        return response.json().then(function (json) {
          success && success(json)
        });
      } else {
        console.log("Oops, we haven't got JSON!");
      }
    });
  },

  fetchRoomList(success, error) {
    fetch(`${apiHost}/roomlist`, {
      method: 'GET',
      headers: headers
    }).then(function (response) {
      if (response.headers.get("content-type").includes("application/json")) {
        return response.json().then(function (json) {
          success && success(json)
        });
      } else {
        console.log("Oops, we haven't got JSON!");
      }
    });
  },

  fetchRoomInfo(id) {
  },

  fetchRoomUserList(id, success, error) {
    fetch(`${apiHost}/room/${id}/userlist`, {
      method: 'GET',
      headers: headers
    }).then(function (response) {
      if (response.headers.get("content-type").includes("application/json")) {
        return response.json().then(function (json) {
          success && success(json)
        });
      } else {
        console.log("Oops, we haven't got JSON!");
      }
    });
  },

  fetchUserWebrtcList(id, success, error) {
    fetch(`${apiHost}/webrtclist/${id}`, {
      method: 'GET',
      headers: headers
    }).then(function (response) {
      if (response.headers.get("content-type").includes("application/json")) {
        return response.json().then(function (json) {
          success && success(json)
        });
      } else {
        console.log("Oops, we haven't got JSON!");
      }
    });
  },

  fetchAreaList(body, success, error) {
    fetch(`${areaHost}/api/v1/ops/tmplusZone`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(function (response) {
      if (response.headers.get("content-type").includes("application/json")) {
        return response.json().then(function (json) {
          success && success(json)
        });
      } else {
        console.log("Oops, we haven't got JSON!");
      }
    });
  }
}
