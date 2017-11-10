/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectConversationsMeta,
  makeSelectОpenedConversationData,
  makeSelectОpenedConversationId,
  makeSelectIsSessionNotificationsSubscriptionSet,
} from './selectors';

import { makeSelectCurrentUserTokenId } from 'containers/App/selectors';
import {
  openConversation,
  sendNewMessage,
  cancelSubscriptionsById,
  initSubscriptionWithIdAndType,
  handleNewMessage,
  generalSessionNotificationReceived,
  getConversations,
} from './actions';

import reducer from './reducer';
import saga from './saga';

import DashboardHeader from 'components/DashboardHeader';
import ConversationsTray from 'components/ConversationsTray';
import Conversation from 'components/Conversation';
import SearchAddUserWrapper from 'components/SearchAddUserWrapper';
// import { getUsername } from 'services/auth.service';

export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    window.d = this;
  }

  shouldComponentUpdate(nextProps) {

    // Prevent update, since this is triggered from initial router.push('dashboard/[conversationIdInUrl]')
    if (!this.props.openedConversationId && nextProps.openedConversationId) {

      return false;
    }

    return true;
  }

  componentWillMount() {

    // trigger conversation loading, if conversationId param is present;
    // prevent additional component loading by returning
    const conversationIdInUrl = this.props.match.params.conversationId;

    if (conversationIdInUrl && !this.props.openedConversationId) {

      this.props.openConversation(conversationIdInUrl);

      return;
    }

    // if conversations aren't loaded
    if (!this.props.conversationsMeta.length) {

      this.props.getConversations();
    }

    // check store to see if general subscription is set and set one, if not
    if (!this.props.isSessionNotificationsSubscriptionSet) {

      // trigger start new general session-notifications subscription
      this.props.initSubscriptionWithIdAndType({

        id: this.props.userId,
        type: 'session-notifications',
        callback: this.props.generalSessionNotificationReceived,
      });
    }
  }

  componentWillReceiveProps(newProps) {

    if (newProps.openedConversationId && newProps.openedConversationId !== this.props.openedConversationId) {

      if (this.props.openedConversationId) {

        // cancel prev subscription
        this.props.cancelSubscriptionsById(this.props.openedConversationId);
      }

      // trigger start new messages subscription
      this.props.initSubscriptionWithIdAndType({

        id: newProps.openedConversationId,
        type: 'message',
        callback: this.props.handleNewMessage,
      });
    }
  }

  onMessageSubmit(msgText) {

    this.props.submitMessage({
      conversationId: this.props.openedConversationId,
      payload: {
        data: msgText,
        senderId: this.props.userId,
        sentAt: new Date(),
      },
    });
  }

  render() {

    const openedConversationUI = this.props.openedConversationId ?
      (
        <Conversation
          openedConversation={this.props.openedConversationData}
          userId={this.props.userId}
          onMessageSubmit={msgText => this.onMessageSubmit(msgText)} />
      ) : <h3>Welcome, select a chat and start a conversation!</h3>;

    return (
      <div className="row row--no-padding col-xs">
        <section className="column column--no-padding col-xs">
          <DashboardHeader />
          <section className="col-xs row row--no-padding">
            <aside className="column col-xs-5">

              <SearchAddUserWrapper/>
              <ConversationsTray
                conversationItems={this.props.conversationsMeta}
                openConversation={this.props.openConversation}
                selectedId={this.props.openedConversationId} />
            </aside>
            {openedConversationUI}
          </section>
        </section></div>
    );
  }
}

Dashboard.propTypes = {
  conversationsMeta: PropTypes.array,
  openedConversationData: PropTypes.object,
  getConversations: PropTypes.func.isRequired,
  openConversation: PropTypes.func.isRequired,
  submitMessage: PropTypes.func.isRequired,
  handleNewMessage: PropTypes.func.isRequired,
  generalSessionNotificationReceived: PropTypes.func.isRequired,
  cancelSubscriptionsById: PropTypes.func.isRequired,
  initSubscriptionWithIdAndType: PropTypes.func.isRequired,
  openedConversationId: PropTypes.string,
  userId: PropTypes.string,
  match: PropTypes.object,
  isSessionNotificationsSubscriptionSet: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  openedConversationData: makeSelectОpenedConversationData(),
  conversationsMeta: makeSelectConversationsMeta(),
  openedConversationId: makeSelectОpenedConversationId(),
  userId: makeSelectCurrentUserTokenId(),
  isSessionNotificationsSubscriptionSet: makeSelectIsSessionNotificationsSubscriptionSet(),
});

function mapDispatchToProps(dispatch) {
  return {
    getConversations: () => dispatch(getConversations()),
    openConversation: conversationId => dispatch(openConversation(conversationId)),
    submitMessage: msgData => dispatch(sendNewMessage(msgData)),
    cancelSubscriptionsById: id => dispatch(cancelSubscriptionsById(id)),
    initSubscriptionWithIdAndType: subscriptionData => dispatch(initSubscriptionWithIdAndType(subscriptionData)),
    handleNewMessage: msgData => dispatch(handleNewMessage(msgData)),
    generalSessionNotificationReceived: data => dispatch(generalSessionNotificationReceived(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(withReducer, withSaga, withConnect)(Dashboard);
