import { call, put, takeLatest } from 'redux-saga/effects';

import { SEARCH_FOR_USER, START_NEW_CONVERSATION_WITH_USER } from './constants';
import { searchForUserResult, cleanUserFoundData } from './actions';
import { startNewConversationWithUserResult } from 'containers/Dashboard/actions';

import request from 'utils/request';

import { getUsername } from 'services/auth.service';

import apiEndpoint from 'configs/CoreConfig.constant';

export function* searchForUser(action) {

  const requestURL = `${apiEndpoint}/search-for-user`;

  try {

    const foundUserData = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ username: action.data }),
      responseType: 'application/json',
    });

    yield put(searchForUserResult(foundUserData));

  } catch (err) {
    console.log(err);
  }
}

export function* startNewConvesationWithUser(action) {

  const requestURL = `${apiEndpoint}/start-new-conversation-with-user`;

  const payload = {
    usernameToStartWith: action.data,
    usernameMakingTheRequest: getUsername(), // auth.service
  };

  try {

    const newConversationData = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      responseType: 'application/json',
    });

    yield put(startNewConversationWithUserResult(newConversationData));
    yield put(cleanUserFoundData());

  } catch (err) {
    console.log(err);
  }
}

// Individual exports for testing
export default function* defaultSaga() {

  /**
   * Wathes for SEARCH_FOR_USER, when a user wants to find a friend
   */
  yield takeLatest(SEARCH_FOR_USER, searchForUser);

    /**
     * Wathes for START_NEW_CONVERSATION_WITH_USER, when a user wants to find a friend
     */
  yield takeLatest(START_NEW_CONVERSATION_WITH_USER, startNewConvesationWithUser);
}
