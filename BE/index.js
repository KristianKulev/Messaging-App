'user strict';

const Hapi = require('hapi');
const Boom = require('Boom');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults
db.defaults({ users: [
    {
      id: 1,
      username: 'admin',
      password: 'pass',
      role: 'admin'
    },
    {
      id: 2,
      username: 'basic',
      password: 'pass',
      role: 'basic'
    }
  ]
}).write();

const server = new Hapi.Server();

server.connection({
  host: '192.168.1.83',
  port: 8080,
  routes: { cors: true }
});

server.route({
  method: 'POST',
  path: '/login',
  handler: postRequestHandler
});

let userTryingToLogin;

function checkAuthStatus(credentials) {
  console.log('creds', credentials);

  userTryingToLogin = db.get('users')
  .find({ username: credentials.username })
  .value();

  let authStatus = 0;

  if (userTryingToLogin) {

    if (userTryingToLogin.password === credentials.password) {

      authStatus = 1;
    } else {

      authStatus = 2;
    }
  }
  console.log('authStatus',authStatus)
  return authStatus;
}

function postRequestHandler(request, reply) {

  const parsedCreds = JSON.parse(request.payload);

  const requestAuthStatus = checkAuthStatus(parsedCreds);

  switch(requestAuthStatus) {

    case 1:
      // Login successful
      reply({
        'authToken': 'some_random_token',
        'uiPermissions': getUiPermissionsBasedOnRole()
      });
      break;

    case 2:
      // Login unsuccessful; wrong password
      reply({ error: 'Wrong Password' })
        .code(401);
      break;

    case 0:
      // Login unsuccessful; wrong username
      reply({ error: 'No Such User Exist!' })
        .code(401);
      break;
  }
}

function getUiPermissionsBasedOnRole() {

  const role = userTryingToLogin.role;

  switch(role) {

    case 'admin':
      return ['admin'];

    case 'basic':
      return ['basic'];
    default:
      return ['basic'];
  }
}

server.start(() => {

    console.log(`started at: ${server.info.uri}`);
});
// server.register(require('vision'), () => {

//     server.views({
//         engines: {
//             hbs: require('handlebars')
//         },
//         relativeTo: __dirname,
//         path: 'views'
//     });

//     server.ext('onPreResponse', (request, reply) => {

//         let response = request.response;

//         if (!response.isBoom) return reply.continue();

//         requestNotFoundHandler(reply, response)
//     });

//     function requestHandler(request, reply) {
//         reply.view('home', { name: request.params.name || 'world' }); //  `world` will be used, if no `name` param is provided
//     }

//     function requestNotFoundHandler(reply, response) {
//         reply.view('notFound', response.output.payload)
//             .code(response.output.statusCode)
//     }

//     server.route({
//         method: 'GET',
//         path: '/user/{name?}',
//         handler: requestHandler
//     });

//     server.route({
//       method: 'GET',
//       path: '/login',
//       handler: postRequestHandler
//   });

//     function postRequestHandler(request, reply) {
//       reply();
//     }
// });






// var Joi = require('joi');
// var custom_fields = {
//   email     : Joi.string().email().required(), // Required
//   password  : Joi.string().required().min(6)   // minimum length 6 characters
// }

// var Bcrypt = require('bcrypt'); // use bcrypt to hash passwords.
// var db     = require('your-favourite-database'); // your choice of DB
// var Boom   = require('boom') //

// function handler (request, reply) {
//   db.get(request.payload.email, function(err, res) { // GENERIC DB request. insert your own here!
//     if(err) {
//       reply('fail').code(400); // don't leak info about user existence
//     }
//     Bcrypt.compare(request.payload.password, user.password, function (err, isValid) {
//         if(!err && isValid) {
//           reply('great success'); // or what ever you want to rply
//         } else {
//           reply(Boom.notFound('Sorry, that username or password is invalid, please try again.'));
//         } // see: https://github.com/dwyl/hapi-login/issues/14
//     }); // END Bcrypt.compare which checks the password is correct
//   }); // END db.get which checks if the person is in our database
// }

// var options = {
//   fields: fields,
//   handler: handler,
//   loginPath: "/api/login"
// }

// var Hapi   = require('hapi'); // https://github.com/nelsonic/learn-hapi
// var server = new Hapi.Server({ debug: false })
// server.connection({ port: 8000 });

// // define the options you are going to pass in when registering your plugin
// var opts = { fields:fields, handler:handler, loginPath:loginPath }; // the fields and handler defined above

// server.register([{ register: require('hapi-login'), options:opts }], function (err) {
//   if (err) { console.error('Failed to load plugin:', err); }
// });

// server.start(function() {
//   console.log('Now Visit: http://127.0.0.1:'+server.info.port);
// });