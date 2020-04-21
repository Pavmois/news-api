const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
