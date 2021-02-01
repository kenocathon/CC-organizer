const Vendor = require('../models/Vendor');
const errorHandler = require('../helpers/dbErrorHandler');
const {extend} = require('lodash');

module.exports = {

  createVendor: async (req, res) => {
    const vendor = new Vendor(req.body);
    try {
      await vendor.save();
      return res.status(200).json({
        message: 'New vendor was created',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  listVendors: async(req, res) => {
    try {
      let vendor = await Vendor.find();
      res.json(vendor);
    } catch (err) {
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  vendorById: async(req, res, next, id) => {
    try {
      let vendor = await Vendor.findById(id);
      if (!vendor)
        return res.status('400').json({
          error: 'Vendor not found',
        });
      req.vendor = vendor;
      next();
    } catch (err) {
      console.error(err);
      return res.status('400').json({
        error: 'Could not retrieve customer',
      });
    }
  },

  singleVendor: async(req, res) => {
    try {
      console.log('request made')
      return res.json(req.vendor);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  updateVendor: async(req, res) => {
    try {
      let vendor = req.vendor;
      vendor = extend(vendor, req.body);
      await vendor.save();
      res.status(200).json(vendor);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  removeVendor: async (req, res) => {
    try {
      let vendor = req.vendor;
      let deletedVendor = await vendor.remove();
      res.json(deletedVendor);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  }
}