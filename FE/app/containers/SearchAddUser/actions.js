/*
 *
 * SearchAddUser actions
 *
 */

import {
  SEARCH_FOR_USER,
  SEARCH_FOR_USER_RESULT,
  START_NEW_CONVERSATION_WITH_USER,
  CLEAN_USER_FOUND_DATA,
} from './constants';

export function searchForUser(data) {

  return {
    type: SEARCH_FOR_USER,
    data,
  };
}

export function searchForUserResult(data) {

  return {
    type: SEARCH_FOR_USER_RESULT,
    data,
  };
}

export function startNewConversationWithUser(data) {

  return {
    type: START_NEW_CONVERSATION_WITH_USER,
    data,
  };
}

export function cleanUserFoundData() {

  return {
    type: CLEAN_USER_FOUND_DATA,
  };
}
