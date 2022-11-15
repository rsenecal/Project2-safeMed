const checkUser = (req, res, next) => {
  if (!localStorage.getItem('userId')) {
    return res.redirect('/user-select');
  }

  next();
};

module.exports = checkUser;
