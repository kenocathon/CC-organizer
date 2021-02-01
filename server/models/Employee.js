const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: "Employee's first name is required",
  },
  lastName: {
    type: String,
    trim: true,
    required: "Employee's last name is required",
  },
  jobsWorked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'job',
    },
  ],
});

module.exports = mongoose.model('employee', EmployeeSchema);
