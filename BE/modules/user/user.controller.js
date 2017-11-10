const UserModel = require('database/models/user.model.js');
const ConversationModel = require('database/models/conversation.model.js');

class UserController {
  constructor(userModel, conversationModel) {

    this.userTryingToLogin = false;
    this.userModel = userModel;
    this.conversationModel = conversationModel;
    this.validateNewUniqueUser = this.validateNewUniqueUser.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.getConversationsMeta = this.getConversationsMeta.bind(this);
    this.findUserByName = this.findUserByName.bind(this);
    this.startNewConversationWithUser = this.startNewConversationWithUser.bind(this);
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

    switch (requestAuthStatus) {

      case 1:
        // Login successful
        reply({
          authToken: this.userTryingToLogin.id, //TODO: add real Auth tokens
          uiPermissions: this._getUiPermissionsBasedOnRole(),
          username: this.userTryingToLogin.username,
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
    console.log('authStatus', authStatus)
    return authStatus;
  }

  _getUiPermissionsBasedOnRole() {

    const role = this.userTryingToLogin.role;

    switch (role) {

      case 'admin':
        return [ 'admin' ];

      case 'basic':
        return [ 'basic' ];
      default:
        return [ 'basic' ];
    }
  }

  getConversationsMeta(request, reply) {

    //TODO: get the id from the token;
    const userId = request.headers.authorization;

    reply(this.userModel.getUsersConversationsMetaById(userId));
  }

  findUserByName(request, reply) {

    let parsedUsername = JSON.parse(request.payload).username;

    reply(this.userModel.getUserByNameShortInfo(parsedUsername));
  }

  startNewConversationWithUser(request, reply) {
// get conversation data for the users from getNewConversationDataForUsers. then add to it the users ids, comming from
//this.userModel.addNewConversationForUser and then make a this.conversationModel.startNewConversation with that new object, containing the userIds

    let parsedPayload = JSON.parse(request.payload);

    const usernameToStartWith = parsedPayload.usernameToStartWith;
    const usernameMakingTheRequest = parsedPayload.usernameMakingTheRequest;


    const newConversationDataForUsers =
      this.conversationModel.getNewConversationDataForUsers([usernameMakingTheRequest, usernameToStartWith]);


    // write a new conversation entry ID to usernameToStartWith and to the user, sending the request
    const userIdMakingTheRequest =
      this.userModel.addNewConversationForUser(usernameMakingTheRequest, newConversationDataForUsers);

    const userIdToStartWith =
      this.userModel.addNewConversationForUser(usernameToStartWith, newConversationDataForUsers);


    const newConversationData = {
      ...newConversationDataForUsers,
      participantsIds: [userIdMakingTheRequest, userIdToStartWith]
    };

    console.log('newConversationData', newConversationData);

    //make a new conversation entry to conversationsDB
    this.conversationModel.startNewConversation(newConversationData);

    reply(newConversationDataForUsers);
  }
}

var userController = new UserController(UserModel, ConversationModel);

module.exports = {
  authenticateUser: userController.authenticateUser,
  validateNewUniqueUser: userController.validateNewUniqueUser,
  getConversationsMeta: userController.getConversationsMeta,
  findUserByName: userController.findUserByName,
  startNewConversationWithUser: userController.startNewConversationWithUser
};