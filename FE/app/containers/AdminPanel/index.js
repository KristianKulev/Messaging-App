/**
 *
 * AdminPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAdminPanel from './selectors';
import reducer from './reducer';
import saga from './saga';

export class AdminPanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>AdminPanel</div>
    );
  }
}

AdminPanel.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminPanel: makeSelectAdminPanel(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminPanel', reducer });
const withSaga = injectSaga({ key: 'adminPanel', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminPanel);
