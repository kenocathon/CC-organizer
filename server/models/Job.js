const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: 'Please select a customer for this job. ',
  },
  location: {
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
    lotNumber: {
      type: String,
      trim: true,
    },
    subdivision: {
      type: String,
      trim: true,
    },
  },
  jobName: {
    type: String,
    trim: true,
  },
  jobType: {
    type: String,
    trim: true,
    enum: ['Flat', 'Wall', 'Other'],
  },
  payType: {
    type: String,
    enum: ['Daily', 'Hourly'],
  },
  scheduledDate: {
    type: Date,
  },
  scheduledTime: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  employeesThatWorked: [
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
      },
      timeOnJob: {
        type: String,
      },
    },
  ],
  vendorList: [
    {
      vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
      },
    },
  ],
  materialList: [
    {
      material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'material',
      },
    },
  ],

  addedMaterials: [
    {
      type: String,
      trim: true,
    },
  ],
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Unscheduled', 'Complete'],
  },
});

module.exports = mongoose.model('job', JobSchema);
