const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  billingAddress: {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zipcode: {
      type: String,
      trim: true,
    },
  },
  email: {
    type: String,
    trim: true,
  },
  listOfJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'job',
    },
  ],
});

module.exports = mongoose.model('customer', CustomerSchema);
