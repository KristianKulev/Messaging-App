/*
 *
 * TestPage actions
 *
 */

import {
    INCREMENT_COUNTER,
    SET_INC_AMOUNT
} from './constants';

export function incrementCounter() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function setIncAmount(amount) {
    return {
      type: SET_INC_AMOUNT,
      payload: amount
    };
}


