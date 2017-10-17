/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  currentUserTokenId: null,
});

function appReducer(state = initialState, action) {

  switch (action.type) {
    case USER_LOGGED_IN:
      return state = state
        .set('currentUserTokenId', fromJS(action.payload.token.data))
        .set('uiPermissions', fromJS(action.payload.uiPermissions.data));

      // return state = {
      //   ...state.toJS(),
      //   uiPermissions: fromJS(action.payload.uiPermissions.data),
      //   currentUserTokenId: fromJS(action.payload.token.data),
      // };

    case USER_LOGGED_OUT:
      console.log('logout', state);
      // return state = state.set('currentUserTokenId', fromJS(null));

      return state = state
        .set('currentUserTokenId', fromJS(null))
        .set('uiPermissions', fromJS(null));

      // return state = {
      //   ...state.toJS(),
      //   uiPermissions: null,
      //   currentUserTokenId: null,
      // };

    default:
      return state;
  }
}

export default appReducer;
