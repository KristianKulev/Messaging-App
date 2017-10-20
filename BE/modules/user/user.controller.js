const UserModel = require('database/models/user.model.js');
const conversationModel = require('database/models/conversation.model.js');

class UserController {
  constructor(userModel) {

    this.userTryingToLogin = false;
    this.userModel = userModel;
    this.validateNewUniqueUser = this.validateNewUniqueUser.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.getConversationsMeta = this.getConversationsMeta.bind(this);
  }

  /* Used for load tests */
  _populateWithSimulatedUsers(usersCount) {

    for (var i = 0; i <= usersCount; i++) {

      this.userModel.addNewUser({
        username: `sim_name_${i}`,
        password: `sim_pass_${i}`
      });
    }
  }

  validateNewUniqueUser(request, reply) {

    const userCredentials = request.payload;

    const isUsernameUnique = !this.userModel.getUserByName(userCredentials.username);

    if (isUsernameUnique) {
      // write new user entry to db
      this.userModel.addNewUser(userCredentials);

      reply({
        successMsg: 'Cool, you are our new user!'
      });

    } else {
      // Register unsuccessful; username is taken
      reply({ error: 'This username is taken!' })
      .code(409);
    }
  }

  /* Used for login */
  authenticateUser(request, reply) {

    const userCredentials = request.payload;

    const requestAuthStatus = this._checkAuthStatus(userCredentials);

    switch(requestAuthStatus) {

      case 1:
        // Login successful
        reply({
          authToken: this.userTryingToLogin.id, //TODO: add real Auth tokens
          uiPermissions: this._getUiPermissionsBasedOnRole(),
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

  _checkAuthStatus(credentials) {
    console.log('creds', credentials);

    this.userTryingToLogin = this.userModel.getUserByName(credentials.username);

    let authStatus = 0;

    if (this.userTryingToLogin) {

      if (this.userTryingToLogin.password === credentials.password) {

        authStatus = 1;
      } else {

        authStatus = 2;
      }
    }
    console.log('authStatus',authStatus)
    return authStatus;
  }

  _getUiPermissionsBasedOnRole() {

    const role = this.userTryingToLogin.role;

    switch(role) {

      case 'admin':
        return ['admin'];

      case 'basic':
        return ['basic'];
      default:
        return ['basic'];
    }
  }

  getConversationsMeta(request, reply) {

    //TODO: get the id from the token;
    const userId = request.headers.authorization;

    reply(this.userModel.getUsersConversationsMetaById(userId));
  }
}

var userController = new UserController(UserModel);

module.exports = {
  authenticateUser: userController.authenticateUser,
  validateNewUniqueUser: userController.validateNewUniqueUser,
  getConversationsMeta: userController.getConversationsMeta
};