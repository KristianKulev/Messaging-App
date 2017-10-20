import { call, put, takeLatest } from 'redux-saga/effects';

import { OPEN_CONVERSATION } from './constants';
import { getConversationsRequestFail, getConversationsRequestSuccess, getConversationDetailsSuccess } from './actions';
import request from 'utils/request';
import apiEndpoint from 'configs/CoreConfig.constant';

export function* sendGetConversationsRequest(action) {

  const requestURL = `${apiEndpoint}/conversations`; // TODO: should come from action

  try {
    // conversations successful;
    const conversations = yield call(request, requestURL, {
      method: 'GET',
    });

    yield put(getConversationsRequestSuccess(conversations));

  } catch (err) {
    console.log(err);
    yield put(getConversationsRequestFail(err.response.body));
  }
}

export function* sendGetConversationDetailsRequest(action) {

  const requestURL = `${apiEndpoint}/conversation/${action.data}`;

  try {
    // conversations successful;
    const conversation = yield call(request, requestURL, {
      method: 'GET',
    });

    yield put(getConversationDetailsSuccess(conversation));

  } catch (err) {
    console.log(err);
    yield put(getConversationsRequestFail(err.response.body));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchAndManageGetConversationsRequests() {
  /**
   * Wathes for GET_CONVERSATIONS
   */
  yield sendGetConversationsRequest();

  yield takeLatest(OPEN_CONVERSATION, sendGetConversationDetailsRequest);
}

