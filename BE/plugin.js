const onMessage = (socket, message, next) => {
  console.log('internal', message)
    // implementation
  next();
}

exports.register = onMessage;

exports.register.attributes = {
  pkg: require('./package.json')
};