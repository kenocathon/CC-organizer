const Customer = require('../models/Customer');
const {extend} = require('lodash')
const errorHandler = require('../helpers/dbErrorHandler');

module.exports = {
  createCustomer: async (req, res) => {
    const customer = new Customer(req.body);
    try {
      await customer.save();
      return res.status(200).json({
        message: 'New customer was created',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  listCustomers: async (req, res) => {
    try {
      let customers = await Customer.find().select(
        'firstName lastName email listOfJobs'
      );
      res.json(customers);
    } catch (err) {
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  searchable: async(req, res) => {
    try{
      let customers = await Customer.find().select('companyName firstName lastName email')
      res.json(customers)
    }catch (err) {
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  customerById: async (req, res, next, id) => {
    try {
      let customer = await Customer.findById(id);
      if (!customer)
        return res.status('400').json({
          error: 'Customer not found',
        });
      req.customer = customer;
      next();
    } catch (err) {
      console.error(err);
      return res.status('400').json({
        error: 'Could not retrieve customer',
      });
    }
  },

  singleCustomer: (req, res) => {
    try {
      return res.json(req.customer);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  updateCustomer: async (req, res) => {
    try {
      let customer = req.customer;
      customer = extend(customer, req.body);
      await customer.save();
      res.status(200).json(customer);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  removeCustomer: async (req, res) => {
    let customer = req.customer;
    try {
      if(customer.listOfJobs > 0){
        return res.status(400).json({
          message: "There are jobs associated with this customer. Delete all jobs before attempting to delete customer"
        })
      }else{
        let deletedCustomer = await customer.remove();
        res.json(deletedCustomer);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },
};
