const db = require('database/configs/db.config.js').db;
const shortid = require('shortid');

class UserModel {

  constructor(db, idGenerator) {

    this.db = db;
    this.idGenerator = idGenerator;

    this.getUser = this.getUser.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
  }

  getUser(username, callback) {

    return this.db.get('users')
      .find({ username: username })
      .value();
  };

  addNewUser(credentials, role, callback) {

    return this.db.get('users')
      .push({
        id: this.idGenerator.generate(),
        username: credentials.username,
        password: credentials.password,
        role: role ? role : 'basic'
      })
      .write();
  };
}

const userModel = new UserModel(db, shortid);

module.exports = {
  getUser: userModel.getUser,
  addNewUser: userModel.addNewUser
};