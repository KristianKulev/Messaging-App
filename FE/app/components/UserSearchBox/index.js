/**
*
* UserSearchBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import { Input } from 'formsy-react-components';
import Form from 'components/Form';

class UserSearchBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  cleanInputBox() {

    this.formInstance.reset({ usernameToFind: '' });

    return this;
  }

  focusSearchInput() {

    this.textareaRef.element.focus();
  }

  submitUsername(data) {
    this.props.onSubmitCallback(data);

    this
      .cleanInputBox()
      .focusSearchInput();
  }

  render() {
    window.m = this;

    return (
      <Form
        onSubmitCallback={data => this.submitUsername(data)}
        ref={(formRef) => {
          this.formInstance = formRef;
        }}
        className="row row--trim-padding user-search-box-component">
        <Input
          rowClassName="col-xs"
          name="usernameToFind"
          placeholder="Search for user"
          validations="minLength:1"
          validationErrors={{}}
          value={''}
          required
          componentRef={(component) => {
            this.textareaRef = component;
          }} />

        <button className="" formNoValidate>
          Find
        </button>
      </Form>
    );
  }
}

UserSearchBox.propTypes = {
  onSubmitCallback: PropTypes.func,
};

export default UserSearchBox;
