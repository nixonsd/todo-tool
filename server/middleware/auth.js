module.exports = function (req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.status(401).send();
  }

  next();
};
