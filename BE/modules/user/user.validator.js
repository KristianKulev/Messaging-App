const Joi = require('Joi');

const authenticateUser = {
  payload: {
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(3).max(10).required()
  }
}

module.exports = {
  authenticateUser
}