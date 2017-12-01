/*
 *
 * Login actions
 *
 */

import {
  SET_LOGGED_USERDATA_TO_STORAGE,
  SEND_LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
} from './constants';

export function setLoggedUserdataToStorage(data) {
  return {
    type: SET_LOGGED_USERDATA_TO_STORAGE,
    data,
  };
}

export function sendLoginRequest(data) {
  return {
    type: SEND_LOGIN_REQUEST,
    data,
  };
}

export function loginRequestFail(data) {
  return {
    type: LOGIN_REQUEST_FAIL,
    data,
  };
}

export function loginRequestSuccess() {
  return {
    type: LOGIN_REQUEST_SUCCESS,
  };
}

