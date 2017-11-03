const ConversationModel = require('database/models/conversation.model.js');

class ConversationController {
  constructor(conversationModel) {

    this.conversationTryingToLogin = false;
    this.conversationModel = conversationModel;
    this.getConversationDetails = this.getConversationDetails.bind(this);
    this.sendNewMessage = this.sendNewMessage.bind(this);
}

  getConversationDetails(request, reply) {
    const conversation = request.params.id;

    reply(this.conversationModel.getConversationHistory(conversation));
  }

  sendNewMessage(request, reply) {
    const conversationId = request.params.id;

    // get the model and call its add function to update the DB, then reply success
    this.conversationModel.addNewMessageToConversation(request.payload);

    reply('success!');
  }
}

var conversationController = new ConversationController(ConversationModel);

module.exports = {
  getConversationDetails: conversationController.getConversationDetails,
  sendNewMessage: conversationController.sendNewMessage,
};