const checkAuth = require('./authMiddleware');
const checkUser = require('./userMiddleware');

module.exports = {
  checkAuth,
  checkUser,
};
