/*
 *
 * SearchAddUser reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_FOR_USER_RESULT,
  CLEAN_USER_FOUND_DATA,
} from './constants';

const initialState = fromJS({
  userFound: null,
});

function searchAddUserReducer(state = initialState, action) {
  switch (action.type) {

    case SEARCH_FOR_USER_RESULT: {
      return state = state.set('userFound', action.data);
    }

    case CLEAN_USER_FOUND_DATA: {
      return state = state.set('userFound', null);
    }

    default:
      return state;
  }
}

export default searchAddUserReducer;
