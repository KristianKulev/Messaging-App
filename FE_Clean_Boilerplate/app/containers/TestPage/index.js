/**
 *
 * TestPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectTestPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { incrementCounter, setIncAmount } from './actions';


import { visibleOnlyAdmin } from 'services/auth.service';

const AdminSection = visibleOnlyAdmin(() => {
  return (<h1>SOMETING ONLY ADMIN SEE'S!</h1>);
});

export class TestPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    window.a = this;
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.doIncrementation()}>incrementCounter</button>

        <input
          type="number"
          min="1"
          value={this.props.testpage.incAmount}
          onChange={(e) => {
            console.log(e.target.value);
            this.props.setIncAmount(e.target.value);
          }}/>

        <AdminSection/>


      </div>
    );
  }
}

TestPage.propTypes = {
  doIncrementation: PropTypes.func.isRequired,
  setIncAmount: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({ testpage: makeSelectTestPage() });

function mapDispatchToProps(dispatch) {
  return {
    doIncrementation: () => dispatch(incrementCounter()),
    setIncAmount: newAmount => dispatch(setIncAmount(newAmount)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'testPage', reducer });
const withSaga = injectSaga({ key: 'testPage', saga });

export default compose(withReducer, withSaga, withConnect, )(TestPage);
