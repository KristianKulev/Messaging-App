const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const dbDefaults = require('./conversationsTable.db.defaults.config.js');

const adapter = new FileSync('database/conversationsTable.db.json');

const db = low(adapter);

// Set some defaults
db.defaults(dbDefaults).write();

module.exports = {
  db
};