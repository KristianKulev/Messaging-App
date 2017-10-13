/**
 *
 * Login
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

import { makeSelectLogin, makeSelectLoginError } from './selectors';
import { sendLoginRequest } from './actions';


export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    window.l = this;
  }

  onSubmit(e) {
    e.preventDefault();

    const components = this.form.components;

    this.props.sendLoginRequest({
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
          <h3>Login</h3>
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

          <section
            className={classNames('form-section form-error is-visible',
            { 'display-none': !this.props.loginError })}>
            loginError
          </section>
          <section className="form-section">
            <Validation.components.Button>Submit</Validation.components.Button>
          </section>
        </Validation.components.Form>
      </Form>
    );
  }
}

Login.propTypes = {
  sendLoginRequest: PropTypes.func.isRequired,
  loginError: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  loginError: makeSelectLoginError(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendLoginRequest: data => dispatch(sendLoginRequest(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(withReducer, withSaga, withConnect)(Login);
