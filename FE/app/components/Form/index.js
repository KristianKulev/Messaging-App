/**
*
* Form
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import {
  Form,
} from 'formsy-react-components';

class WrappedForm extends React.PureComponent {

  constructor() {
    super();
    window.f = this;

    this.state = {
      canSubmit: false,
      hasSubmitBeenTried: false,
    };

    this.formInstance = null;
    this.submitForm = this.submitForm.bind(this);
    this.refCallback = this.refCallback.bind(this);
  }

  toggleCanSubmit(newState) {

    this.setState({
      canSubmit: !!newState,
    });
  }

  submitForm(data) {

    if (!this.state.hasSubmitBeenTried) {

      this.setState({
        hasSubmitBeenTried: true,
      });
    }

    if (this.formInstance.formsyForm.state.isValid) {
      console.log('form is valid, pass submit', data);
      this.props.onSubmitCallback(data);
    }
  }

  refCallback(form) {
    this.formInstance = form;
  }

  reset(input) {
    this.formInstance.formsyForm.reset(input);

    this.setState({
      canSubmit: false,
      hasSubmitBeenTried: false,
    });
  }

  render() {

    return (
      <Form
        onValid={() => this.toggleCanSubmit(true)}
        onInvalid={() => this.toggleCanSubmit()}
        onSubmit={data => this.submitForm(data)}
        className={`${this.props.className} ${!this.state.hasSubmitBeenTried || this.state.canSubmit ? '' : 'form-invalid'} form-component`}
        layout={this.props.layout || 'vertical'}
        ref={this.refCallback}
        validateOnSubmit={this.props.validateOnSubmit || true}>

        {this.props.children}
      </Form>
    );
  }
}

WrappedForm.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  layout: PropTypes.string,
  validateOnSubmit: PropTypes.bool,
  onSubmitCallback: PropTypes.func,
};

export default WrappedForm;
