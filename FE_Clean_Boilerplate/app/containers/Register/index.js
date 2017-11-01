/**
 *
 * Register
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import classNames from 'classnames';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import Form from 'components/Form';
import { Input } from 'formsy-react-components';

import { makeSelectRegister, makeSelectRegisterError } from './selectors';
import { sendRegisterRequest } from './actions';

export class Register extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    window.r = this;
  }

  onSubmit(data) {

    this
      .props
      .sendRegisterRequest({ username: data.username, password: data.password });
  }

  render() {
    return (
      <Form onSubmitCallback={data => this.onSubmit(data)} className="login col-xs-6">
        <h3>Register</h3>
        <fieldset className="form-section">
          <Input
            name="username"
            value=""
            label="Username"
            type="text"
            placeholder="Username"
            validations={{
              minLength: 3,
            }}
            validationErrors={{
              isDefaultRequiredValue: 'Username field is required.',
              minLength: 'Username should be at least 3 chars in length.',
            }}
            required/>
          <Input
            name="password"
            value=""
            label="Password"
            type="password"
            placeholder="Password"
            validations={{
              minLength: 3,
            }}
            validationErrors={{
              isDefaultRequiredValue: 'Password field is required.',
              minLength: 'Password should be at least 3 chars in length.',
            }}
            required/>
          <Input
            name="passwordConfirm"
            value=""
            label="Confirm password"
            type="password"
            validations="equalsField:password"
            validationErrors={{
              equalsField: 'Passwords must match.',
            }}
            placeholder="Retype password"/>

        </fieldset>
        <fieldset className="form-section">

          <button className="btn btn-primary" formNoValidate>
            Submit
          </button>

        </fieldset>
      </Form>
    );
  }
}

Register.propTypes = {
  sendRegisterRequest: PropTypes.func.isRequired,
  registerError: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({ register: makeSelectRegister(), registerError: makeSelectRegisterError() });

function mapDispatchToProps(dispatch) {
  return {
    sendRegisterRequest: data => dispatch(sendRegisterRequest(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'register', reducer });
const withSaga = injectSaga({ key: 'register', saga });

export default compose(withReducer, withSaga, withConnect)(Register);
