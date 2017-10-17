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

import Validation from 'react-validation';

import classNames from 'classnames';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import Form from 'components/Form';

import { makeSelectRegister, makeSelectRegisterError } from './selectors';
import { sendRegisterRequest } from './actions';

export class Register extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    window.r = this;
  }

  onSubmit(e) {
    e.preventDefault();

    const components = this.form.components;

    this.props.sendRegisterRequest({
      username: components.username.state.value,
      password: components.password.state.value,
    });
  }

  render() {
    return (
      <Form className="row center-xs">
        <Validation.components.Form
          ref={c => this.form = c}
          onSubmit={(e, data) => this.onSubmit(e, data)}
          className="col-xs-6 start-xs">
          <h3>Register</h3>
          <section className="form-section">
            <label htmlFor="username">
              <span>Username*</span>
              <Validation.components.Input
                value=""
                name="username"
                validations={['required']}
                errorClassName="is-invalid-input"/>
            </label>
          </section>
          <section className="form-section">
            <label htmlFor="password">
              <span>Password*</span>
              <Validation.components.Input
                type="password"
                value=""
                name="password"
                validations={['required']}
                errorClassName="is-invalid-input"/>
            </label>
          </section>

          {/* TODO: add validation for password match before send! */}
          <section className="form-section">
            <label htmlFor="repeatPassword">
              <span>Repeat Password*</span>
              <Validation.components.Input
                type="password"
                value=""
                name="repeatPassword"
                validations={['required']}
                errorClassName="is-invalid-input"/>
            </label>
          </section>

          <section
            className={classNames('form-section form-error is-visible',
            { 'display-none': !this.props.registerError })}>
            registerError
          </section>
          <section className="form-section">
            <Validation.components.Button>Submit</Validation.components.Button>
          </section>
        </Validation.components.Form>
      </Form>
    );
  }
}

Register.propTypes = {
  sendRegisterRequest: PropTypes.func.isRequired,
  registerError: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister(),
  registerError: makeSelectRegisterError(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendRegisterRequest: data => dispatch(sendRegisterRequest(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'register', reducer });
const withSaga = injectSaga({ key: 'register', saga });

export default compose(withReducer, withSaga, withConnect)(Register);
