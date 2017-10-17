/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';

import Form from '../../components/Form';

import Validation from 'react-validation';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor() {
        super();
        window.l = this;
    }
    render() {
        return (
            <Form>
                <Validation.components.Form>
                    <h3>Login</h3>
                    <section className="form-section">
                        <label>
                            <span>Email*</span>
                            <Validation.components.Input 
                                value='' 
                                name='email' 
                                validations={['required']}
                                errorClassName='is-invalid-input'/>
                        </label>
                    </section>
                    <section className="form-section">
                        <label>
                            <span>Password*</span>
                            <Validation.components.Input
                                type='password'
                                value=''
                                name='password'
                                validations={['required']}
                                errorClassName='is-invalid-input'/>
                        </label>
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
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({login: makeSelectLogin()});

function mapDispatchToProps(dispatch) {
    return {dispatch};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'login', reducer});
const withSaga = injectSaga({key: 'login', saga});

export default compose(withReducer, withSaga, withConnect,)(Login);
