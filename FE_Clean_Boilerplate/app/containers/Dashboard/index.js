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
import makeSelectDashboard from './selectors';
import { getConversations, openConversation } from './actions';
import reducer from './reducer';
import saga from './saga';

export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    window.d = this;
  }

  componentWillMount() {

    this.props.getConversations();
  }

  render() {

    const conversationItems =
      this.props.dashboard && this.props.dashboard.conversationsMeta ?
        this.props.dashboard.conversationsMeta.map((item, i) => {
          return (
            <li key={i}>
              <p onClick={() => this.props.openConversation(item.id)}>
                conv. id: {item.id}
              </p>
            </li>
          );
        }) : '';

    const openedConversation = this.props.dashboard.openedConversationData ?
      this.props.dashboard.openedConversationData.messages.map((message, i) => {
        return (
          <li key={i}>
            { message.data} { message.sentAt }
          </li>
        );
      }) : <h3>Chat details will open here!</h3>;
    return (
      <section>
        <h1>Dashboard</h1>
        <section className="row">
          <ul className="col-xs-30">{conversationItems}</ul>
          <section className="col-xs">
            {/* render opened conversation details, or smt */}
            {openedConversation}
          </section>
        </section>
      </section>
    );
  }
}

Dashboard.propTypes = {
  getConversations: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  openConversation: PropTypes.func.isRequired,

};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    getConversations: () => dispatch(getConversations()),
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
