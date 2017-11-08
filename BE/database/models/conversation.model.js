const conversationsDb = require('database/configs/conversationsTable.db.config.js').db;

const shortid = require('shortid');

class ConversationModel {

  constructor(conversationsDb, idGenerator) {

    this.conversationsDb = conversationsDb;
    this.idGenerator = idGenerator;

    this.getConversationHistory = this.getConversationHistory.bind(this);
    this.addNewMessageToConversation = this.addNewMessageToConversation.bind(this);
    this.startNewConversation = this.startNewConversation.bind(this);
  }

  getConversationHistory(conversationId, callback) {

    return this.conversationsDb.get('conversations')
      .find({ conversationId: conversationId })
      .value();
  };

  addNewMessageToConversation(conversationData, callback) {

    return this.conversationsDb.get('conversations')
      .find({ conversationId: conversationData.conversationId })
      .get('messages')
      .push({
        senderId: conversationData.data.senderId,
        sentAt: conversationData.data.sentAt,
        data: conversationData.data.data,
      })
      .write();
  };

  startNewConversation() {

    // generate new conversation record
    const newConversationId = this.idGenerator.generate();

    this.conversationsDb.get('conversations')
      .push({
        conversationId: newConversationId,
        messages: []
      })
      .write();

    return newConversationId;

  };
}

const conversationModel = new ConversationModel(conversationsDb, shortid);

module.exports = {
  getConversationHistory: conversationModel.getConversationHistory,
  addNewMessageToConversation: conversationModel.addNewMessageToConversation,
  startNewConversation: conversationModel.startNewConversation
};