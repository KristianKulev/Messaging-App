const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const dbDefaults = require('./usersTable.db.defaults.config.js');

const adapter = new FileSync('database/usersTable.db.json');

const db = low(adapter);

// Set some defaults
db.defaults(dbDefaults).write();

module.exports = {
  db
};