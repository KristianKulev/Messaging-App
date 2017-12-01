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

import classNames from 'classnames';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import Form from 'components/Form';

import { Input } from 'formsy-react-components';

import { makeSelectLogin, makeSelectLoginError } from './selectors';
import { sendLoginRequest } from './actions';


export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    window.l = this;

  }

  onSubmit(data) {
    console.log(data);

    this.props.sendLoginRequest({
      username: data.username,
      password: data.password,
    });
  }

  render() {
    return (
      <Form onSubmitCallback={data => this.onSubmit(data)} className="login col-xs-6">
        <h3>Login</h3>
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

        </fieldset>
        <section
          className={classNames('form-section form-error is-visible',
            { 'display-none': !this.props.loginError })}>
            loginError
        </section>
        <fieldset className="form-section">

          <button className="btn btn-primary" formNoValidate>
            Submit
          </button>

        </fieldset>
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
