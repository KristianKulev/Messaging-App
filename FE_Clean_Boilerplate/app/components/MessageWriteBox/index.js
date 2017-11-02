/**
*
* MessageWriteBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Textarea } from 'formsy-react-components';
import Form from 'components/Form';
import './styles.scss';

class MessageWriteBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    // this.cleanMessageBox = this.cleanMessageBox.bind(this);

  }

  cleanMessageBox() {

    this.formInstance.reset({ messageText: '' });

    return this;
  }

  focusTextarea() {

    this.textareaRef.element.focus();
  }

  submitMsg(data) {
    this.props.onSubmitCallback(data);

    this
      .cleanMessageBox()
      .focusTextarea();
  }

  render() {
    window.m = this;

    return (
      <Form
        onSubmitCallback={data => this.submitMsg(data)}
        ref={(formRef) => {
          this.formInstance = formRef;
        }}
        className="message-write-box-component">
        <Textarea
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
