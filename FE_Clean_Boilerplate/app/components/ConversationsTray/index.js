/**
*
* ConversationsTray
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class ConversationsTray extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    window.c = this;
    console.log(props);
    this.props = props;
  }

  render() {

    if (!this.props.conversationItems) return null;

    const conversationItems = this.props.conversationItems.map((item, i) => {
      return (
        <li key={i} className={`col-xs ${this.props.selectedId && item.id === this.props.selectedId ? 'is-selected' : ''}`} onClick={() => this.props.openConversation(item.id)}>
          <p>
            <span className="img">img </span>{item.id}
          </p>
        </li>
      );
    });


    return (
      <aside className="conversations-tray-component col-xs-5">

        <ul className="row coversations-tray">
          {conversationItems}
        </ul>
      </aside>
    );
  }
}

ConversationsTray.propTypes = {
  conversationItems: PropTypes.array,
  selectedId: PropTypes.string,
};

export default ConversationsTray;
