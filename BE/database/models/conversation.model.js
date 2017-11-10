const conversationsDb = require('database/configs/conversationsTable.db.config.js').db;

const shortid = require('shortid');

class ConversationModel {

  constructor(conversationsDb, idGenerator) {

    this.conversationsDb = conversationsDb;
    this.idGenerator = idGenerator;

    this.getConversationHistory = this.getConversationHistory.bind(this);
    this.addNewMessageToConversation = this.addNewMessageToConversation.bind(this);
    this.startNewConversation = this.startNewConversation.bind(this);
    this.getParticipantsByNotificationId = this.getParticipantsByNotificationId.bind(this);
    this.getNewConversationDataForUsers = this.getNewConversationDataForUsers.bind(this);
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

  getNewConversationDataForUsers(participants) {
    // generate new conversation record (to be used for usersTable)
    const newConversationData = {
      conversationId: this.idGenerator.generate(),
      conversationName: participants.join(', '), // generate the name
    };

    return newConversationData;
  }

  startNewConversation(newConversationData) {

    // generate new conversation record

    const newConversationModel = {
      ...newConversationData,
      messages: []
    };

    this.conversationsDb.get('conversations')
      .push(newConversationModel)
      .write();
  };

  getParticipantsByNotificationId(conversationId, callback) {

    return this.conversationsDb.get('conversations')
      .find({ conversationId: conversationId })
      .get('participantsIds')
      .value();
  };
}

const conversationModel = new ConversationModel(conversationsDb, shortid);

module.exports = {
  getConversationHistory: conversationModel.getConversationHistory,
  addNewMessageToConversation: conversationModel.addNewMessageToConversation,
  startNewConversation: conversationModel.startNewConversation,
  getParticipantsByNotificationId: conversationModel.getParticipantsByNotificationId,
  getNewConversationDataForUsers: conversationModel.getNewConversationDataForUsers,
};