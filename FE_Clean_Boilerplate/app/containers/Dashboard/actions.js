/*
 *
 * Dashboard actions
 *
 */

import {
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAIL,
  OPEN_CONVERSATION,
  GET_CONVERSATION_DETAILS_SUCCESS,
  SEND_NEW_MESSAGE,
  HANDLE_NEW_MESSAGE,
  CANCEL_SUBSCRIPTIONS_BY_ID,
  INIT_SUBSCRIPTION_WITH_ID_AND_TYPE,
  START_NEW_CONVERSATION_WITH_USER_RESULT,
  INIT_SESSION_NOTIFICATIONS_SUBSCRIPTION_SUCCESS,
  GENERAL_SESSION_NOTIFICATION_RECEIVED,
} from './constants';

export function getConversations() {
  return {
    type: GET_CONVERSATIONS,
  };
}

export function openConversation(data) {

  return {
    type: OPEN_CONVERSATION,
    data,
  };
}


export function getConversationsRequestSuccess(data) {
  return {
    type: GET_CONVERSATIONS_SUCCESS,
    data,
  };
}

export function getConversationsRequestFail() {
  return {
    type: GET_CONVERSATIONS_FAIL,
  };
}

export function getConversationDetailsSuccess(data) {
  return {
    type: GET_CONVERSATION_DETAILS_SUCCESS,
    data,
  };
}

export function sendNewMessage(data) {
  return {
    type: SEND_NEW_MESSAGE,
    data,
  };
}

export function handleNewMessage(data) {
  return {
    type: HANDLE_NEW_MESSAGE,
    data,
  };
}

export function cancelSubscriptionsById(id) {

  return {
    type: CANCEL_SUBSCRIPTIONS_BY_ID,
    id,
  };
}

export function initSubscriptionWithIdAndType(data) {

  return {
    type: INIT_SUBSCRIPTION_WITH_ID_AND_TYPE,
    data,
  };
}

export function startNewConversationWithUserResult(data) {

  return {
    type: START_NEW_CONVERSATION_WITH_USER_RESULT,
    data,
  };
}

export function initSessionNotificationsSubscriptionSuccess() {

  return {
    type: INIT_SESSION_NOTIFICATIONS_SUBSCRIPTION_SUCCESS,
  };
}

export function generalSessionNotificationReceived(data) {
  return {
    type: GENERAL_SESSION_NOTIFICATION_RECEIVED,
    data,
  };
}
