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
} from './selectors';

import { makeSelectCurrentUserTokenId } from 'containers/App/selectors';
import {
  openConversation,
  sendNewMessage,
  cancelSubscriptionsById,
  initSubscriptionWithId,
  handleNewMessage,
  // searchForUser,
  // startNewConversationWithUser,
} from './actions';

import reducer from './reducer';
import saga from './saga';

import DashboardHeader from 'components/DashboardHeader';
import ConversationsTray from 'components/ConversationsTray';
import Conversation from 'components/Conversation';
import SearchAddUserWrapper from 'components/SearchAddUserWrapper';

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

    // trigger conversation loading, if conversationId param is present
    const conversationIdInUrl = this.props.match.params.conversationId;

    if (conversationIdInUrl && !this.props.openedConversationId) {

      this.props.openConversation(conversationIdInUrl);
    }
  }

  componentWillReceiveProps(newProps) {

    if (newProps.openedConversationId && newProps.openedConversationId !== this.props.openedConversationId) {

      if (this.props.openedConversationId) {

        // cancel prev subscription
        this.props.cancelSubscriptionsById(this.props.openedConversationId);
      }

      // trigger start new subscription
      this.props.initSubscriptionWithId({

        id: newProps.openedConversationId,
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

  // findUserByName(data) {
  //   this.usernameToFind = data.usernameToFind;
  //   console.log(data);


  //   this.props.searchForUser(this.usernameToFind);
  //   // Fire action to send a POST /search-for-user; payload: { username: 'name' }
  // }

  // startNewConversation() {

  //   console.log(this.usernameToFind);

  //   if (!this.usernameToFind) return;

  //   this.props.startNewConversationWithUser(this.usernameToFind);

  //   this.usernameToFind = '';
  // }

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
  openConversation: PropTypes.func.isRequired,
  submitMessage: PropTypes.func.isRequired,
  handleNewMessage: PropTypes.func.isRequired,
  cancelSubscriptionsById: PropTypes.func.isRequired,
  initSubscriptionWithId: PropTypes.func.isRequired,
  openedConversationId: PropTypes.string,
  userId: PropTypes.string,
  match: PropTypes.object,
  // searchForUser: PropTypes.func.isRequired,
  // startNewConversationWithUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  openedConversationData: makeSelectОpenedConversationData(),
  conversationsMeta: makeSelectConversationsMeta(),
  openedConversationId: makeSelectОpenedConversationId(),
  userId: makeSelectCurrentUserTokenId(),
});

function mapDispatchToProps(dispatch) {
  return {
    openConversation: conversationId => dispatch(openConversation(conversationId)),
    submitMessage: msgData => dispatch(sendNewMessage(msgData)),
    cancelSubscriptionsById: id => dispatch(cancelSubscriptionsById(id)),
    initSubscriptionWithId: id => dispatch(initSubscriptionWithId(id)),
    handleNewMessage: msgData => dispatch(handleNewMessage(msgData)),
    // searchForUser: username => dispatch(searchForUser(username)),
    // startNewConversationWithUser: username => dispatch(startNewConversationWithUser(username)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(withReducer, withSaga, withConnect)(Dashboard);
