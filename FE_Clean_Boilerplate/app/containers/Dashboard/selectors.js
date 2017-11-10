import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboard state domain
 */
const selectDashboardDomain = state => state.get('dashboard');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () => createSelector(
  selectDashboardDomain,
  substate => substate.toJS()
);

const makeSelectConversationsMeta = () => createSelector(
  selectDashboardDomain,
  substate => substate.toJS().conversationsMeta
);

const makeSelectОpenedConversationData = () => createSelector(
  selectDashboardDomain,
  substate => substate.toJS().openedConversationData
);

const makeSelectОpenedConversationId = () => createSelector(
  selectDashboardDomain,
  (substate) => {
    const openedConversationData = substate.toJS().openedConversationData;
    if (!openedConversationData) return null;

    return openedConversationData.conversationId;
  }
);

const makeSelectIsSessionNotificationsSubscriptionSet = () => createSelector(
  selectDashboardDomain,
  substate => substate.toJS().isSessionNotificationsSubscriptionSet
);

export default makeSelectDashboard;
export {
  selectDashboardDomain,
  makeSelectConversationsMeta,
  makeSelectОpenedConversationData,
  makeSelectОpenedConversationId,
  makeSelectIsSessionNotificationsSubscriptionSet,
};
