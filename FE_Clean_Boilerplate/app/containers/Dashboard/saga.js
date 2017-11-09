import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { OPEN_CONVERSATION, SEND_NEW_MESSAGE, CANCEL_SUBSCRIPTIONS_BY_ID, INIT_SUBSCRIPTION_WITH_ID, SEARCH_FOR_USER, START_NEW_CONVERSATION_WITH_USER } from './constants';
import {
  getConversationsRequestFail,
  getConversationsRequestSuccess,
  getConversationDetailsSuccess,
  searchForUserResult,
  startNewConversationWithUserResult,
} from './actions';
import request from 'utils/request';
import { websocketClient } from 'utils/websocketRequest';

import { getUsername } from 'services/auth.service';

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

export function* initMessageSubscription(action) {

  const subscriptionPath = `/new-message/${action.data.id}`;

  websocketClient.initSubscription(subscriptionPath, action.data.callback);
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
   * Wathes for GET_CONVERSATIONS
   */
  yield sendGetConversationsRequest();

  /**
   * Wathes for SEND_NEW_MESSAGE, sends request to the server with WS
   */
  yield takeLatest(SEND_NEW_MESSAGE, sendNewMessage);


  /**
   * Wathes for INIT_SUBSCRIPTION_WITH_ID, when a conversation is closed
   */
  yield takeLatest(INIT_SUBSCRIPTION_WITH_ID, initMessageSubscription);

  /**
   * Wathes for CANCEL_SUBSCRIPTIONS_BY_ID, when a conversation is closed
   */
  yield takeLatest(CANCEL_SUBSCRIPTIONS_BY_ID, cancelMessageSubscriptions);

  // /**
  //  * Wathes for SEARCH_FOR_USER, when a user wants to find a friend
  //  */
  // yield takeLatest(SEARCH_FOR_USER, searchForUser);

  // /**
  //  * Wathes for START_NEW_CONVERSATION_WITH_USER, when a user wants to find a friend
  //  */
  // yield takeLatest(START_NEW_CONVERSATION_WITH_USER, startNewConvesationWithUser);
}

// export function* searchForUser(action) {

//   const requestURL = `${apiEndpoint}/search-for-user`;

//   try {
//     // login successful; fire action to setLoggedUserdataToStorage
//     const foundUserData = yield call(request, requestURL, {
//       method: 'POST',
//       body: JSON.stringify({ username: action.data }),
//       responseType: 'application/json',
//       // contentType: 'application/json',
//     });
//     console.log('saga', foundUserData);
//     yield put(searchForUserResult(foundUserData));

//   } catch (err) {
//     console.log('saga', err);
//     console.log(err);
//   }
// }

// export function* startNewConvesationWithUser(action) {

//   const requestURL = `${apiEndpoint}/start-new-conversation-with-user`;

//   const payload = {
//     usernameToStartWith: action.data,
//     usernameMakingTheRequest: getUsername(), // auth.service
//   };

//   try {
//     // login successful; fire action to setLoggedUserdataToStorage
//     const newConversationData = yield call(request, requestURL, {
//       method: 'POST',
//       body: JSON.stringify(payload),
//       responseType: 'application/json',
//       // contentType: 'application/json',
//     });

//     yield put(startNewConversationWithUserResult(newConversationData));

//   } catch (err) {
//     console.log(err);
//   }
// }
