import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  GET_CONVERSATIONS,
  OPEN_CONVERSATION,
  SEND_NEW_MESSAGE,
  CANCEL_SUBSCRIPTIONS_BY_ID,
  INIT_SUBSCRIPTION_WITH_ID_AND_TYPE,
} from './constants';

import {
  getConversationsRequestFail,
  getConversationsRequestSuccess,
  getConversationDetailsSuccess,
  initSessionNotificationsSubscriptionSuccess,
} from './actions';
import request from 'utils/request';
import { websocketClient } from 'utils/websocketRequest';

import apiEndpoint from 'configs/CoreConfig.constant';

export function* sendGetConversationsRequest() {

  const requestURL = `${apiEndpoint}/conversations`;

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

    yield put(push(`/dashboard/${conversation.conversationId}`));

  } catch (err) {
    console.log(err);
    yield put(getConversationsRequestFail(err.response.body));
  }
}

export function* sendNewMessage(action) {

  const requestURL = `/new-message/${action.data.conversationId}`;

  try {

    const message = {
      method: 'POST',
      path: requestURL,
      payload: JSON.stringify({
        conversationId: action.data.conversationId,
        data: action.data.payload,
      }),
    };

    websocketClient.makeRequest(message);

  } catch (err) {
    console.log(err);
  }
}

export function* cancelMessageSubscriptions(action) {

  const subscriptionPath = `/new-message/${action.id}`;

  websocketClient.cancelSubscriptions(subscriptionPath);
}

export function* handleSubscriptionTypes(action) {

  switch (action.data.type) {

    case 'message':
      yield initMessageSubscription(action);
      break;

    case 'session-notifications':
      yield initSessionNotificationsSubscription(action);
      break;

    default:
      yield initMessageSubscription(action);
  }
}

export function* initMessageSubscription(action) {

  const subscriptionPath = `/new-message/${action.data.id}`;

  websocketClient.initSubscription(subscriptionPath, action.data.callback);
}

export function* initSessionNotificationsSubscription(action) {
  const subscriptionPath = `/session-notifications/${action.data.id}`;
  console.log('initSessionNotificationsSubscription', subscriptionPath, action.data);

  websocketClient.initSubscription(subscriptionPath, action.data.callback);

  yield put(initSessionNotificationsSubscriptionSuccess());
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchAndManageGetConversationsRequests() {

  /**
   * Wathes for OPEN_CONVERSATION, pulls the details for the newly opened one
   */
  yield takeLatest(OPEN_CONVERSATION, sendGetConversationDetailsRequest);

  /**
   * Wathes for INIT_SUBSCRIPTION_WITH_ID_AND_TYPE, when a conversation is opened
   */
  yield takeLatest(INIT_SUBSCRIPTION_WITH_ID_AND_TYPE, handleSubscriptionTypes);

  /**
   * Wathes for GET_CONVERSATIONS
   */
  yield takeLatest(GET_CONVERSATIONS, sendGetConversationsRequest);

  /**
   * Wathes for SEND_NEW_MESSAGE, sends request to the server with WS
   */
  yield takeLatest(SEND_NEW_MESSAGE, sendNewMessage);

  /**
   * Wathes for CANCEL_SUBSCRIPTIONS_BY_ID, when a conversation is closed
   */
  yield takeLatest(CANCEL_SUBSCRIPTIONS_BY_ID, cancelMessageSubscriptions);
}
