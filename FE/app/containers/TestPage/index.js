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


const InputComponent = (props) => (<input
  className={props.className}
  type={props.type}
  min={props.min}
  value={props.value}
  onChange={props.onChangeHandler}/>);

const Input = styled(InputComponent)`
    border: 1px solid red;
`;

export class TestPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    window.a = this;
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.doIncrementation()}>incrementCounter</button>

        <Input
          type="number"
          min="1"
          value={this.props.testpage.incAmount}
          onChangeHandler={(e) => {
            console.log(e.target.value);
            this.props.setIncAmount(e.target.value);
          }}/>

        <h1>{this.props.testpage.count}</h1>
      </div>
    );
  }
}

TestPage.propTypes = {
  doIncrementation: PropTypes.func.isRequired,
  setIncAmount: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({testpage: makeSelectTestPage()});

function mapDispatchToProps(dispatch) {
  return {
    doIncrementation: () => dispatch(incrementCounter()),
    setIncAmount: (newAmount) => dispatch(setIncAmount(newAmount))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'testPage', reducer});
const withSaga = injectSaga({key: 'testPage', saga});

export default compose(withReducer, withSaga, withConnect,)(TestPage);
