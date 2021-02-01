const Job = require('../models/Job');
const Customer = require('../models/Customer');
const errorHandler = require('../helpers/dbErrorHandler');

module.exports = {
  scheduleJob: async (req, res) => {
    const job = new Job(req.body);
    const customer = await Customer.findById(job.customer);
    try {
      if (job.scheduledDate) {
        job.status = 'Scheduled';
      } else {
        job.status = 'Unscheduled';
      }
      await job.save();
      customer.listOfJobs.push(job);
      await customer.save();
      return res.status(201).json({
        message: 'Job was successfully scheduled',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  jobById: async (req, res, next, id) => {
    try {
      let job = await Job.findById(id);
      if (!job)
        return res.status(500).json({
          error: 'Job not found by Id',
        });
      req.job = job;
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: 'Could not retrieve job',
      });
    }
  },

  singleJob: async (req, res) => {
    try {
      const { jobId } = req.params;
      const job = await Job.findById(jobId)
        .populate(
          'customer scheduledEmployees employeesThatWorked vendor materials'
        )
        .populate('listOfSavedMaterials');
      return res.json(job);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  listJobs: async (req, res) => {
    try {
      let job = await Job.find().select(
        'customer location jobType scheduledDate completedDate status'
      );
      console.log(job);
      res.json(job);
    } catch (err) {
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  todaysJobs: async (req, res) => {
    try {
      let todaysJobs = await Job.find({ scheduledDate: req.params.date });
      res.json(todaysJobs);
    } catch (err) {
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  updateJob: async (req, res) => {
    try {
      let job = req.job;
      job = extend(job, req.body);
      await job.save();
      res.status(200).json(job);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  removeJob: async (req, res) => {
    try {
      let job = req.job;
      let deletedJob = await job.remove();
      res.status(200).json({
        message: `Selected job was successfully removed from job list`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  },

  completeJob: async (req, res) => {
    const job = req.job;
    try {
      employee.jobsWorked.push(job);
      await employee.save();
      job.employeesThatWorked = [...job.scheduledEmployees];
      job.status = 'Complete';
      job.completedDate = Date.now;
      await job.save();
      return res.status(200).json({
        message: 'Job has been marked complete',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error:
          'An error occured on server attempting to set job status to complete',
      });
    }
  },
};
