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

          // publish to subsribers
          this.server.publish(`/new-message/${request.params.id}`, request.payload.data);

          // send to the DB
          require('modules/conversation/conversation.controller').sendNewMessage(request, reply)
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

    this.server.register([require('nes'), require('plugin')], (err) => {

      console.log('registering!')

      this.server.subscription('/new-message/{id}');

      this.setupRoutes();

      this.server.start((err) => {
        console.log(`started at: ${this.server.info.uri}`);
      });

    });
  }
}

const app = new App();

app.init();





