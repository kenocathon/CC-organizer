const User = require('../models/User');

module.exports = {
  createUser: async (req, res) => {
    const user = new User(req.body);
    try {
      console.log('post request received');
      await user.save();
      return res.status(200).json({
        message: `New user with username ${user.userName} was created`,
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },
  userByID: async (req, res, next, id) => {
    try {
      let user = await User.findById(id);
      if (!user)
        return res.status('400').json({
          error: 'User not found',
        });
      req.user = user;
      next();
    } catch (err) {
      return res.status('400').json({
        error: 'Could not retrieve user',
      });
    }
  },

  read: (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    try {
      return res.json(req.profile);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  list: async (req, res) => {
    try {
      let users = await User.find().select('userName firstName lastName email');
      res.json(users);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  update: async (req, res) => {
    try {
      let user = req.profile;
      user = extend(user, req.body);
      user.updated = Date.now();
      await user.save();
      user.hashed_password = undefined;
      user.salt = undefined;
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  remove: async (req, res) => {
    try {
      let user = req.profile;
      let deletedUser = await user.remove();
      deletedUser.hashed_password = undefined;
      deletedUser.salt = undefined;
      res.json(deletedUser);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  checkUserRole: async(req, res) => {
    let userId = req.body.userId;
    let user = await User.findById(userId);
    if (user.role === req.body.role){
      return res.status(200).json({
        userRole: user.role,
      })
    }else{
      return res.status(401).json({
        error: "User role is not valid"
      })
    }
  }
};
