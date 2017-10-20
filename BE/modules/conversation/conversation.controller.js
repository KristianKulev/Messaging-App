const ConversationModel = require('database/models/conversation.model.js');

class ConversationController {
  constructor(conversationModel) {

    this.conversationTryingToLogin = false;
    this.conversationModel = conversationModel;
    this.getConversationDetails = this.getConversationDetails.bind(this);
  }

  getConversationDetails(request, reply) {
    const conversation = request.params.id;

    reply(this.conversationModel.getConversationHistory(conversation));
  }
}

var conversationController = new ConversationController(ConversationModel);

module.exports = {
  getConversationDetails: conversationController.getConversationDetails
};