'user strict';

// use for enabling realative path require calls in other files
require('app-module-path').addPath(__dirname + '/');

const Hapi = require('hapi');

class App {

  constructor() {
    this.server = new Hapi.Server();
  }

  setupRoutes() {

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
  }

  setConfig() {

    this.server.connection({
      host: '192.168.1.83',
      port: 8080,
      routes: { cors: true }
    });
  }

  init() {

    this.setConfig();
    this.setupRoutes();

    this.server.start(() => {

        console.log(`started at: ${this.server.info.uri}`);
    });
  }
}

const app = new App();

app.init();





