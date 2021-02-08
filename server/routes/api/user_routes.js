const express = require('express');
const customerCtrl = require('../../controllers/customers');
const employeeCtrl = require('../../controllers/employees');
const jobCtrl = require('../../controllers/jobs');
const materialCtrl = require('../../controllers/materials');
const vendorCtrl = require('../../controllers/vendors');

const userRouter = express.Router();

//*******CUSTOMER ROUTES
userRouter
  .route('/customers')
  .post(customerCtrl.createCustomer)
  .get(customerCtrl.listCustomers);

userRouter.route('/search/customers').get(customerCtrl.searchable);

//SINGLE CUSTOMER ROUTES
userRouter
  .route('/customer/:customerId')
  .get(customerCtrl.singleCustomer)
  .put(customerCtrl.updateCustomer)
  .delete(customerCtrl.removeCustomer);

//******EMPLOYEE ROUTES
userRouter
  .route('/employees')
  .post(employeeCtrl.createEmployee)
  .get(employeeCtrl.listEmployees);

//SINGLE EMPLOYEE ROUTES
userRouter
  .route('/employee/:employeeId')
  .get(employeeCtrl.singleEmployee)
  .put(employeeCtrl.updateEmployee)
  .delete(employeeCtrl.removeEmployee);

//******JOB ROUTES
userRouter.route('/jobs').post(jobCtrl.createJob).get(jobCtrl.listJobs);
userRouter.route('/search/jobs').get(jobCtrl.searchable);
userRouter.route('/jobs/:date').get(jobCtrl.todaysJobs);

//SINGLE JOB ROUTES
userRouter
  .route('/job/:jobId')
  .get(jobCtrl.singleJob)
  .put(jobCtrl.updateJob)
  .delete(jobCtrl.removeJob);

//******MATERIAL ROUTES
userRouter
  .route('/materials')
  .post(materialCtrl.createSavedMaterial)
  .get(materialCtrl.listSavedMaterials);

//SINGLE MATERIAL ROUTES
userRouter
  .route('/material/:materialId')
  .get(materialCtrl.singleSavedMaterial)
  .put(materialCtrl.updateSavedMaterial)
  .delete(materialCtrl.removeSavedMaterial);

//*******VENDOR ROUTES
userRouter
  .route('/vendors')
  .post(vendorCtrl.createVendor)
  .get(vendorCtrl.listVendors);

//SINGLE VENDOR ROUTES
userRouter
  .route('/vendor/:vendorId')
  .get(vendorCtrl.singleVendor)
  .put(vendorCtrl.updateVendor)
  .delete(vendorCtrl.removeVendor);

//PARAMS
userRouter.param('customerId', customerCtrl.customerById);
userRouter.param('employeeId', employeeCtrl.employeeById);
userRouter.param('jobId', jobCtrl.jobById);
userRouter.param('materialId', materialCtrl.materialById);
userRouter.param('vendorId', vendorCtrl.vendorById);

module.exports = userRouter;
