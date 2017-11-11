const ConversationModel = require('database/models/conversation.model.js');

class NotificationController {
  constructor(conversationModel) {

    this.conversationModel = conversationModel;

    this.getParticipantsForNotification = this.getParticipantsForNotification.bind(this);
    this.emitGeneralSessionNotification = this.emitGeneralSessionNotification.bind(this);
  }

  getParticipantsForNotification(request, reply) {
    const notificationId = request.params.id;

    return this
      .conversationModel
      .getParticipantsByNotificationId(notificationId);
  }

  emitGeneralSessionNotification(model) {

    let { serverInstance, baseUrl, notificationData, subscribersIds, idToMissNotification } = model;

    for (let i = 0; i < subscribersIds.length; i++) {

      // check against the senderId, so that sender doesn't get notified
      if (subscribersIds[i] !== idToMissNotification) {

        // publish a notification, together with the message
        serverInstance.publish(`/${baseUrl}/${subscribersIds[i]}`, notificationData);
      }
    }

    return subscribersIds.splice(idToMissNotification, 1);;
  }

}

var notificationController = new NotificationController(ConversationModel);

module.exports = {
  getParticipantsForNotification: notificationController.getParticipantsForNotification,
  emitGeneralSessionNotification: notificationController.emitGeneralSessionNotification
};