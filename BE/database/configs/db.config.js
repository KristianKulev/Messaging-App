const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const dbDefaults = require('./db.defaults.config.js');

const adapter = new FileSync('database/db.json');
const db = low(adapter);

// Set some defaults
db.defaults(dbDefaults).write();

exports.db = db;

class DataBase {
  constructor(dbDefaults) {
    this.dbDefaults = dbDefaults;
  }

  init() {

  }
}