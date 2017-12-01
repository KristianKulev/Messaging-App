/*
 *
 * Register actions
 *
 */

import {
  SEND_REGISTER_REQUEST,
  REGISTER_REQUEST_FAIL,
  REGISTER_REQUEST_SUCCESS,
} from './constants';

export function sendRegisterRequest(data) {
  return {
    type: SEND_REGISTER_REQUEST,
    data,
  };
}

export function registerRequestFail(data) {
  return {
    type: REGISTER_REQUEST_FAIL,
    data,
  };
}

export function registerRequestSuccess() {
  return {
    type: REGISTER_REQUEST_SUCCESS,
  };
}
