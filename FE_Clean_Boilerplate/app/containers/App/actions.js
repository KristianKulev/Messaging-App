/*
 *
 * App Actions
 *
 */


import { USER_LOGGED_IN, USER_LOGGED_OUT } from './constants';

export function userLoggedIn(data) {
  return {
    type: USER_LOGGED_IN,
    payload: data,
  };
}

export function userLoggedOut(data) {
  return {
    type: USER_LOGGED_OUT,
    data,
  };
}
