const Employee = require('../models/Employee');
const Job = require('../models/Job');
const {extend, indexOf} = require('lodash');
const errorHandler = require('../helpers/dbErrorHandler');

module.exports = {
  createEmployee: async (req, res) => {
    const employee = new Employee(req.body);
    try {
      await employee.save();
      return res.status(200).json({
        message: 'New employee was created',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  employeeById: async (req, res, next, id) => {
    try {
      let employee = await Employee.findById(id);
      if (!employee)
        return res.status(500).json({
          error: 'Employee not found',
        });
      req.employee = employee;
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: 'Could not retrieve employee',
      });
    }
  },

  singleEmployee: (req, res) => {
    try {
      console.log(req.employee)
      return res.json(req.employee);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  listEmployees: async (req, res) => {
    try {
      let employee = await Employee.find().populate('jobsWorked');
      res.json(employee);
    } catch (err) {
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  updateEmployee: async (req, res) => {
    try {
      let employee = req.employee;
      employee = extend(employee, req.body);
      await employee.save();
      res.status(200).json(employee);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },
  
  removeEmployee: async (req, res) => {
    try {
      let employee = req.employee;
      //remove the employee from any scheduled jobs they are attached to
      const listOfJobs = await Job.find().select('scheduledEmployees')
      // check each scheduled employee array to see if the employee Id is there
      let indexOfEmployee
      for (let i = 0; i > listOfJobs.length; i++){
        if (listOfJobs[i].status !== 'Complete'){
          for(let j = 0; j > listOfJobs[i].scheduledEmployees.length; j++){
            if (listOfJobs[i].scheduledEmployees[j].id === req.employee.id)
              indexOfEmployee = listOfJobs[i].scheduledEmployees.indexOf(listOfJobs[i].scheduledEmployees[j])
              listOfJobs[i].scheduledEmployees.splice(indexOfEmployee, 1)
          }
        }
      }
      await employee.remove()
      return res.status(200).json({
        message: 'Employee has been deleted and removed from all incomplete jobs.'
      })
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },
};
