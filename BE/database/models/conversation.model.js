const conversationsDb = require('database/configs/conversationsTable.db.config.js').db;

const shortid = require('shortid');

class ConversationModel {

  constructor(conversationsDb, idGenerator) {

    this.conversationsDb = conversationsDb;
    this.idGenerator = idGenerator;

    this.getConversationHistory = this.getConversationHistory.bind(this);
  }

  getConversationHistory(conversationId, callback) {

    return this.conversationsDb.get('conversations')
      .find({ conversationId: conversationId })
      .value();
  };
}

const conversationModel = new ConversationModel(conversationsDb, shortid);

module.exports = {
  getConversationHistory: conversationModel.getConversationHistory
};