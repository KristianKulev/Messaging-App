/*
 *
 * Register reducer
 *
 */

import { fromJS } from 'immutable';
import { REGISTER_REQUEST_FAIL, REGISTER_REQUEST_SUCCESS } from './constants';

const initialState = fromJS({
  registerError: false,
});

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST_FAIL:
      console.log(action);
      return state = state.set('registerError', true);
    case REGISTER_REQUEST_SUCCESS:
      return state = state.set('registerError', false);

    default:
      return state;
  }
}

export default registerReducer;
