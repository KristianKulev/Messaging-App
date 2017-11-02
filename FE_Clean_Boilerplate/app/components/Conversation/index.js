/**
*
* Conversation
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import MessageWriteBox from 'components/MessageWriteBox';
import './styles.scss';

class Conversation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.props = props;
    this.coversationMessagesContainer = null; // <ul>, where messages are rendered
    window.c = this;
  }

  sendNewMessage(msgData) {

    this.props.onMessageSubmit(msgData.messageText);
  }

  componentDidMount() {

    this.coversationMessagesContainer = document.getElementById('coversationMessagesContainer');
    this.goToBottomOfChatArea();
  }

  componentDidUpdate(prevProps) {

    // new message has been rendered; trigger scroll to bottom of chat area
    if (prevProps.openedConversation.messages.length < this.props.openedConversation.messages.length) {

      this.goToBottomOfChatArea();
    }
  }

  goToBottomOfChatArea() {
    this.coversationMessagesContainer.scrollTop = this.coversationMessagesContainer.scrollHeight;
  }
  render() {

    const conversationMsgs = this.props.openedConversation && this.props.openedConversation.messages.length ?
      this.props.openedConversation.messages.map((message, i) => {
        return (
          <li key={i} className={`message-row row ${message.senderId === this.props.userId ? 'sent end-xs' : 'received start-xs'}`}>
            <p className="message">
              <span className="text"> { message.data }</span>
              <span className="time"> { new Date(message.sentAt).toLocaleTimeString() }</span>
            </p>
          </li>
        );
      }) : <li>Chat messages will be displayed here!</li>;

    return (
      <section className="conversation-component column col-xs">

        <ul id="coversationMessagesContainer" className="coversation-messages-container col-xs">
          {conversationMsgs}
        </ul>
        <MessageWriteBox onSubmitCallback={data => this.sendNewMessage(data)}/>
      </section>
    );
  }
}

Conversation.propTypes = {
  openedConversation: PropTypes.object,
  userId: PropTypes.string,
  onMessageSubmit: PropTypes.func.isRequired,
};

export default Conversation;
