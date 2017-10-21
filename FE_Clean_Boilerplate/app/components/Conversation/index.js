/**
*
* Conversation
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Conversation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    window.m = this;
    console.log(props);
    this.props = props;
  }

  render() {

    const conversationMsgs = this.props.openedConversation ?
      this.props.openedConversation.messages.map((message, i) => {
        return (
          <li key={i} className={`message-row row ${message.senderId === this.props.userId ? 'sent end-xs' : 'received start-xs'}`}>
            <p className="message">
              <span className="text"> { message.data }</span>
              <span className="time"> { message.sentAt }</span>
            </p>
          </li>
        );
      }) : <li>Chat details will open here!</li>;

    return (
      <section className="conversation-component col-xs">

        <ul className="coversation-messages-container col-xs-12">
          {conversationMsgs}
        </ul>
      </section>
    );
  }
}

Conversation.propTypes = {
  openedConversation: PropTypes.object,
  userId: PropTypes.string,
};

export default Conversation;
