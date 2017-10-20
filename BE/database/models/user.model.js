const usersDb = require('database/configs/usersTable.db.config.js').db;

const shortid = require('shortid');

class UserModel {

  constructor(usersDb, idGenerator) {

    this.usersDb = usersDb;
    this.idGenerator = idGenerator;

    this.getUserByName = this.getUserByName.bind(this);
    this.getUsersConversationsMetaById = this.getUsersConversationsMetaById.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
  }

  getUserByName(username, callback) {

    return this.usersDb.get('users')
      .find({ username: username })
      .value();
  };

  getUsersConversationsMetaById(userId, callback) {

    return this.usersDb.get('users')
      .find({ id: userId })
      .value().activeConversationsMeta;
  };

  addNewUser(credentials, role, callback) {

    return this.usersDb.get('users')
      .push({
        id: this.idGenerator.generate(),
        username: credentials.username,
        password: credentials.password,
        role: role ? role : 'basic',
        activeConversationsMeta: []
      })
      .write();
  };
}

const userModel = new UserModel(usersDb, shortid);

module.exports = {
  getUserByName: userModel.getUserByName,
  getUsersConversationsMetaById: userModel.getUsersConversationsMetaById,
  addNewUser: userModel.addNewUser
};