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
} from './actions';

import reducer from './reducer';
import saga from './saga';

import DashboardHeader from 'components/DashboardHeader';
import ConversationsTray from 'components/ConversationsTray';
import Conversation from 'components/Conversation';

// import { initClientSubscription, cancelClientSubscriptions } from 'utils/request';

export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    window.d = this;
  }

  componentDidMount() {


    // TODO: investigate other options, since these timeouts are prone to breaking!


    // trigger conversation loading, if conversationId param is present
    const conversationIdInUrl = this.props.match.params.conversationId;

    if (conversationIdInUrl && !this.props.openedConversationId) {

      // timeout required, so that sagas have time to load
      setTimeout(() => this.props.openConversation(conversationIdInUrl), 300);
    }

    if (this.props.openedConversationId) {

      // send an action to open the subscription; the saga will listen for that action
      setTimeout(() => this.props.initSubscriptionWithId({

        id: this.props.openedConversationId,
        callback: this.props.handleNewMessage,

      }), 1000);
    }
  }

  componentWillUnmount() {
    console.log(this.props.openedConversationId, this.props.openedConversationData.conversationId);
    // trigger unsubsribe action for the conversation
    this.props.cancelSubscriptionsById(this.props.openedConversationId);
    // cancelClientSubscriptions(this.props.openedConversationId);
  }

  render() {

    return (
      <section className="container-fluid col-xs-12">
        <h1
          onClick={() => {
            this.props.cancelSubscriptionsById(this.props.openedConversationId);
          }}>remove subs!</h1>
        <h1
          onClick={() => {
            this.props.submitMessage({
              conversationId: this.props.openedConversationId,
              payload: {
                data: 'another hi!',
                senderId: this.props.userId,
                sentAt: new Date(),
              },
            });
          }}>
          Send Post Message
        </h1>


        <DashboardHeader/>
        <section className="row">
          <ConversationsTray
            conversationItems={this.props.conversationsMeta}
            openConversation={this.props.openConversation}
            selectedId={this.props.openedConversationId}/>

          <Conversation
            openedConversation={this.props.openedConversationData}
            userId={this.props.userId}/>
        </section>
      </section>
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
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(withReducer, withSaga, withConnect)(Dashboard);
