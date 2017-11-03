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
  HANDLE_NEW_MESSAGE,
} from './constants';

const initialState = fromJS({
  conversationsMeta: [],
  openedConversationData: {
    messages: [],
  },
});

function dashboardReducer(state = initialState, action) {

  switch (action.type) {
    case GET_CONVERSATIONS:
      return state;

    case GET_CONVERSATIONS_SUCCESS:
      return state = state.set('conversationsMeta', action.data);

    case GET_CONVERSATION_DETAILS_SUCCESS:
      return state = state.set('openedConversationData', action.data);

    case HANDLE_NEW_MESSAGE: {

      const currentState = state.get('openedConversationData');

      return state =
        state.set('openedConversationData', {
          conversationId: currentState.conversationId,
          messages: currentState.messages.concat(action.data),
        });
    }
    default:
      return state;
  }
}

export default dashboardReducer;
