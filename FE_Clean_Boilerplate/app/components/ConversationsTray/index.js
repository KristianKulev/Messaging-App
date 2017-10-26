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
    this.props = props;
  }


  triggerOpenConversation(isConversationOpened, id) {

    if (isConversationOpened) return;

    this.props.openConversation(id);
  }

  render() {

    if (!this.props.conversationItems) return null;

    const conversationItems = this.props.conversationItems.map((item, i) => {

      const isConversationOpened = this.props.selectedId && item.id === this.props.selectedId;

      return (
        <li
          key={i}
          className={`col-xs ${isConversationOpened ? 'is-selected' : ''}`}
          onClick={() => this.triggerOpenConversation(isConversationOpened, item.id)}>
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
  openConversation: PropTypes.func.isRequired,
};

export default ConversationsTray;
