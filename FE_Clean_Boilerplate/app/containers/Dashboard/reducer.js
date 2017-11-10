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
  START_NEW_CONVERSATION_WITH_USER_RESULT,
  INIT_SESSION_NOTIFICATIONS_SUBSCRIPTION_SUCCESS,
  GENERAL_SESSION_NOTIFICATION_RECEIVED,
} from './constants';

const initialState = fromJS({
  conversationsMeta: [],
  openedConversationData: {
    messages: [],
  },
  isSessionNotificationsSubscriptionSet: false,
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

    case START_NEW_CONVERSATION_WITH_USER_RESULT: {

      const currentOpenedConversations = state.get('conversationsMeta');

      return state = state.set('conversationsMeta', currentOpenedConversations.concat(action.data));
    }

    case INIT_SESSION_NOTIFICATIONS_SUBSCRIPTION_SUCCESS: {

      return state = state.set('isSessionNotificationsSubscriptionSet', true);
    }

    case GENERAL_SESSION_NOTIFICATION_RECEIVED: {


      console.log(action.data);

      if (action.data.type === 'new-message-received') {

        const openedConversationData = state.get('openedConversationData');

        // prevent additional work, if the user has the screen opened anyways
        if (openedConversationData.conversationId === action.data.conversationId) {
          return state;
        }

        const currentOpenedConversations = state.get('conversationsMeta');

        const indexOfConversation =
          currentOpenedConversations.findIndex(i => i.conversationId === action.data.conversationId);

        const newObj = {
          ...state.get('conversationsMeta')[indexOfConversation],
          unreadMessage: action.data.data,
        };

        const newMeta = state.get('conversationsMeta').slice();

        newMeta[indexOfConversation] = newObj;

        state = state.set('conversationsMeta', newMeta);
      }



      // TODO: add handler for session-notifications (when a user has added you as a friend)
      if (action.data.type === 'session-notifications') {
        return state;
      }

      return state;
    }

    default:
      return state;
  }
}

export default dashboardReducer;
