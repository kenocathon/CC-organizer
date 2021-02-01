const express = require('express');
const userCtrl = require('../../controllers/users');
const { requireSignin, hasAuthorization } = require('../../controllers/auth')

const adminRouter = express.Router();

// The user Id entered here is the Id of the user requesting the information to check the role first.
adminRouter.route('/users/').post(userCtrl.createUser).get(userCtrl.list);

adminRouter.route('/roles/').post(userCtrl.checkUserRole)

adminRouter
  .route('/user/:userId')
  .get(userCtrl.read, requireSignin, hasAuthorization)
  .put(userCtrl.update, requireSignin, hasAuthorization)
  .delete(userCtrl.remove, requireSignin, hasAuthorization);

adminRouter.param('userId', userCtrl.userByID);

module.exports = adminRouter;
