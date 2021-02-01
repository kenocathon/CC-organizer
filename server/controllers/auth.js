const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('config');

const login = async (req, res) => {
  try {
    let user = await User.findOne({
      'email': req.body.email,
    });
    if (!user)
      return res.status('401').json({
        error: 'User not found',
      });

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email or password was incorrect.",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,

      },
      config.jwtSecret,
      {algorithm: 'HS256'}
    );

    return res.json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
    });
  } catch (err) {
    return res.status('401').json({
      error: 'Could not sign in',
    });
  }
};

const logout = (req, res) => {
  res.clearCookie('t');
  return res.status('200').json({
    message: 'signed out',
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256']
});


const hasAuthorization = (req, res, next) => {
  const authorized = req.user && req.auth && req.user._id == req.auth._id;
  if (!authorized) {
    return res.status('403').json({
      error: 'User is not authorized',
      req: `auth: ${req.auth._id}`,
    });
  }
  next();
};

module.exports = {
  login,
  logout,
  hasAuthorization,
  requireSignin,
};