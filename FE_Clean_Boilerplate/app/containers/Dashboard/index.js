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
import { makeSelectConversationsMeta, makeSelectОpenedConversationData, makeSelectОpenedConversationId } from './selectors';
import { makeSelectCurrentUserTokenId } from 'containers/App/selectors';
import { openConversation } from './actions';
import reducer from './reducer';
import saga from './saga';



import DashboardHeader from 'components/DashboardHeader';
import ConversationsTray from 'components/ConversationsTray';
import Conversation from 'components/Conversation';

export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    window.d = this;
  }

  render() {

    return (
      <section className="container-fluid col-xs-12">
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
  openedConversationId: PropTypes.string,
  userId: PropTypes.string,
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
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
