'user strict';

// use for enabling realative path require calls in other files
require('app-module-path').addPath(__dirname + '/');

const Hapi = require('hapi');
const Nes = require('nes');

class App {

  constructor() {
    this.server = new Hapi.Server();
  }

  setupRoutes() {

    // Register && Login
    this.server.route({
      method: 'POST',
      path: '/login',
      handler: require('modules/user/user.controller').authenticateUser,
      config: {
        validate: require('modules/user/user.validator').authenticateUser
      }
    });

    this.server.route({
      method: 'POST',
      path: '/register',
      handler: require('modules/user/user.controller').validateNewUniqueUser,
      config: {
        validate: require('modules/user/user.validator').authenticateUser
      }
    });


    // Conversation specific
    this.server.route({
      method: 'GET',
      path: '/conversations',
      handler: require('modules/user/user.controller').getConversationsMeta,
      // config: {
      //   validate: require('modules/user/user.validator').authenticateUser
      // }
    });

    this.server.route({
      method: 'GET',
      path: `/conversation/{id}`,
      handler: require('modules/conversation/conversation.controller').getConversationDetails,
      // config: {
      //   validate: require('modules/user/user.validator').authenticateUser
      // }
    });

    this.server.route({
      method: 'POST',
      path: '/new-message/{id*}',
      config: {
        description: 'Chat message handler',
        handler: (request, reply) => {

          // publish new-message to subsribers
          this.server.publish(`/new-message/${request.params.id}`, request.payload.data);

          // get the receiver/s ids from the notificationController, based on the notification ID - request.params.id
          const participantsIds =
            require('modules/notification/notification.controller').getParticipantsForNotification(request, reply);

          /**
           * Publish a general session-notification of type new-message-received.
           * To be used, when a chat isn't the actively opened one from the user
           */
          const notificationData = {
            type: 'new-message-received',
            conversationId: request.params.id,
            ...request.payload.data,
          };

          const notificationModel = {
            serverInstance: this.server,
            baseUrl: 'session-notifications',
            notificationData: notificationData,
            subscribersIds: participantsIds,
            idToMissNotification: request.payload.data.senderId,
          };

          const notificationReceivers =
            require('modules/notification/notification.controller')
              .emitGeneralSessionNotification(notificationModel);


          // TODO: this should not be called here, instead a check should be done on the FE, when a new general session-notification with type 'new-message-received', that checks if the currently opened conversation is the one, that the notification applies to. Only if it's not the one, a general notification, COMMING FROM THE FE should be dispatched, that says to the BE to do te following addNewUnreadMsgToConversationMeta. Additionally, when a conversation with unread msg is opened on the FE, another notification should be send to the BE, that says that the BE should clear that unreadMessage entry from the user.table.
          require('modules/user/user.controller')
            .addNewUnreadMsgToConversationMeta(notificationReceivers, notificationData);

          // send to the DB
          require('modules/conversation/conversation.controller').sendNewMessage(request, reply);
        }
      }
    });


    // Search and add friends specific
    this.server.route({
      method: 'POST',
      path: '/search-for-user',
      handler: require('modules/user/user.controller').findUserByName,
      // config: {
      //   validate: require('modules/user/user.validator').authenticateUser
      // }
    });

    this.server.route({
      method: 'POST',
      path: '/start-new-conversation-with-user',
      handler: require('modules/user/user.controller').startNewConversationWithUser,
      // config: {
      //   validate: require('modules/user/user.validator').authenticateUser
      // }
    });


  }

  setConfig() {

    this.server.connection({
      host: 'localhost',
      port: 8080,
      routes: { cors: true }
    });
  }

  init() {

    this.setConfig();

    this.server.register([Nes], (err) => {

      console.log('registering!')

      this.server.subscription('/new-message/{id}');


      // listen for session notifications subscriptions
      this.server.subscription('/session-notifications/{id}');

      this.setupRoutes();

      this.server.start((err) => {
        console.log(`started at: ${this.server.info.uri}`);
      });

    });
  }
}

const app = new App();

app.init();





