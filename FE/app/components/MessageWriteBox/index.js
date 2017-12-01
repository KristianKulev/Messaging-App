/**
*
* MessageWriteBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'formsy-react-components';
import Form from 'components/Form';
import './styles.scss';

class MessageWriteBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  cleanMessageBox() {

    this.formInstance.reset({ messageText: '' });

    return this;
  }

  focusInput() {

    this.textareaRef.element.focus();
  }

  submitMsg(data) {
    this.props.onSubmitCallback(data);

    this
      .cleanMessageBox()
      .focusInput();
  }

  render() {
    window.m = this;

    return (
      <Form
        onSubmitCallback={data => this.submitMsg(data)}
        ref={(formRef) => {
          this.formInstance = formRef;
        }}
        className="row message-write-box-component">
        <Input
          rowClassName="col-xs"
          name="messageText"
          placeholder="Write a message"
          validations="minLength:1"
          validationErrors={{}}
          value={''}
          required
          componentRef={(component) => {
            this.textareaRef = component;
          }} />

        <button className="" formNoValidate>
          Send
        </button>
      </Form>
    );
  }
}

MessageWriteBox.propTypes = {
  onSubmitCallback: PropTypes.func.isRequired,
};

export default MessageWriteBox;
