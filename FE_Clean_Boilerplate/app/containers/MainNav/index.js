/**
 *
 * MainNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Header from 'components/Header';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import makeSelectMainNav from './selectors';
import reducer from './reducer';
import saga from './saga';

import { userLoggedOut } from 'containers/App/actions';

export class MainNav extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    window.m = this;
    this.logout = this.logout.bind(this);
  }
  render() {
    return (
      <Header
        userIsAuthenticated={this.props.userIsAuthenticatedFlag}
        logout={this.logout}/>
    );
  }

  logout() {
    this.props.userLoggedOut();
  }
}

MainNav.propTypes = {
  userLoggedOut: PropTypes.func.isRequired,
  userIsAuthenticatedFlag: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainNav: makeSelectMainNav(),
});

function mapDispatchToProps(dispatch) {
  return {
    userLoggedOut: () => dispatch(userLoggedOut({
      storageType: 'session',
      payload: {
        tokenKey: 'token_id',
        uiPermissionsKey: 'ui_permissions',
      },
    })),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mainNav', reducer });
const withSaga = injectSaga({ key: 'mainNav', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MainNav);
