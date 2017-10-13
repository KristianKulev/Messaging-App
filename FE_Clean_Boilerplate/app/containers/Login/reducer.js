/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './constants';

const initialState = fromJS({
  loginError: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST_FAIL:
      console.log(action);
      return state = state.set('loginError', true);
    case LOGIN_REQUEST_SUCCESS:
      return state = state.set('loginError', false);

    default:
      return state;
  }
}

export default loginReducer;
