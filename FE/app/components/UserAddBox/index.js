/**
*
* UserAddBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class UserAddBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    window.u = this;
  }
  render() {
    console.log(this.props);
    if (!this.props.userFound) return null;

    return (
      <section className="user-add-box-component row">
        <h4 className="col-xs-12">
          Do you want to add user <span className="user-found">{this.props.userFound.username}</span>?
        </h4>
        <div className="col-xs-12">
          <div className="row between-xs controls">
            <button
              className="col-xs-5 btn btn--slim"
              onClick={() => this.props.startNewConversation(true)}>
              Add
              </button>
            <button
              className="col-xs-5 btn btn--slim"
              onClick={() => this.props.startNewConversation(false)}>
              Dismiss
            </button>
          </div>
        </div>
      </section>
    );
  }
}

UserAddBox.propTypes = {
  userFound: PropTypes.object,
  startNewConversation: PropTypes.func.isRequired,
};

export default UserAddBox;
