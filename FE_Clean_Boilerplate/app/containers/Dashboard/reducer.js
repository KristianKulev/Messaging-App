/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION_DETAILS_SUCCESS,
} from './constants';

const initialState = fromJS({});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return state;

    case GET_CONVERSATIONS_SUCCESS:
      return state = state.set('conversationsMeta', action.data);

    case GET_CONVERSATION_DETAILS_SUCCESS:
      return state = state.set('openedConversationData', action.data);

    default:
      return state;
  }
}

export default dashboardReducer;
