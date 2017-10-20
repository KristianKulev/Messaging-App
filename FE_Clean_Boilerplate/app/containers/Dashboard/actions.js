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

