/**
*
* Form
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function Form(props) {
  return (
    <div className={`${props.className} form-component`}>{props.children}</div>
  );
}

Form.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
};

export default Form;
