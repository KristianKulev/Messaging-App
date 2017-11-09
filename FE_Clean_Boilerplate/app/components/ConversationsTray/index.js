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


  triggerOpenConversation(isConversationOpened, conversationId) {

    if (isConversationOpened) return;

    this.props.openConversation(conversationId);
  }

  render() {

    if (!this.props.conversationItems) return null;

    const conversationItems = this.props.conversationItems.map((item, i) => {

      const isConversationOpened = this.props.selectedId && item.conversationId === this.props.selectedId;

      return (
        <li
          key={i}
          className={`row ${isConversationOpened ? 'is-selected' : ''}`}
          onClick={() => this.triggerOpenConversation(isConversationOpened, item.conversationId)}>
          <p>
            <span className="img">img </span>{item.conversationName}
          </p>
        </li>
      );
    });


    return (
      <aside className="conversations-tray-component column col-xs column--no-padding">
        <section className="row row--no-margin">
          <ul className="column col-xs coversations-tray">
            {conversationItems}
          </ul>
        </section>
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
