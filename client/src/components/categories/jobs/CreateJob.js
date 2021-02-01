import React, { useState, useEffect } from 'react';
import { listEmployees } from '../../../api/api-employee';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { createJob } from '../../../api/api-job';
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import FormButton from '../../FormButton';

import useGetRequest from '../../hooks/useGetRequest';

const useStyles = makeStyles({
  root: {
    padding: '1rem',
  },
  formControl: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: '.5rem',
    },
  },
  title: {
    padding: '1rem',
  },
  formContainer: {
    padding: '3rem',
  },
  formButton: {
    margin: '.5rem',
  },
  formElement: {
    '& .MuiFormControl-root': {
      margin: '1rem',
      width: '90%',
    },
    '& .MuiGrid-container': {
      padding: '1rem',
    },
  },
});

export default function CreateJob() {
  const { title, root, formControl, formButton, formElement } = useStyles();

  const [inputFieldData, setInputFieldData] = useState({
    jobName: '',
    customer: '',
    notes: '',
    status: 'Unscheduled',
  });
  const { jobName, customer } = inputFieldData;

  const [jobType, setJobType] = useState('flat');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const [location, setLocation] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
    lotNumber: '',
    subdivision: '',
  });

  const { data: employees } = useGetRequest(listEmployees);

  const [employeeCheckboxes, setEmployeeCheckboxes] = useState({
    checkboxes: {
      Keenan: true,
      Josh: false,
      Glen: true,
      Hilliary: false,
    },
  });

  useEffect(() => {
    const employee = (employees) => {
      return employees && employees.map((employee) => employee._id);
    };

    setEmployeeCheckboxes({
      ...employeeCheckboxes,
      checkboxes: employee(employees).reduce(
        (options, option) => ({
          ...options,
          [option]: true,
        }),
        {}
      ),
    });
  }, [employees]); // ONly use employees as dependency

  const { checkboxes } = employeeCheckboxes;

  const onSubmit = (e) => {
    e.preventDefault();
    const job = {
      customer: 'id',
      jobName: inputFieldData.jobName,
      jobType,
      payTye: () => {
        if (jobType === 'Flat') {
          return 'Daily';
        } else {
          return 'Hourly';
        }
      },
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      location: {
        street: location.street,
        city: location.city,
        state: location.state,
        zipcode: location.zipcode,
        lotNumber: location.lotNumber,
        subdivision: location.subdivision,
      },
      scheduledEmployees: '',
    };
  };

  const handleChange = (name) => (e) => {
    if (name === 'jobType') {
      setJobType(e.target.value);
    } else {
      setInputFieldData({ ...inputFieldData, [name]: e.target.value });
    }
  };
  const handleDateChange = (date) => (e) => {
    if (e.target.id === 'time-picker') {
      setSelectedTime(date);
      setInputFieldData({ ...inputFieldData, status: 'Scheduled' });
    } else {
      setSelectedDate(date);
    }
  };

  const handleLocation = (name) => (e) => {
    setLocation({ ...location, [name]: e.target.value });
  };

  const handleEmployeeCheckboxes = (name) => (e) => {
    const checkboxes = employeeCheckboxes.checkboxes;
    checkboxes[name] = e.target.checked;
    setEmployeeCheckboxes({ checkboxes });
  };

  function camelCaseToTextCase(str) {
    const result = str.replace(/([A-Z])/g, ' $1');
    const spliceBack = result.charAt(0).toUpperCase() + result.slice(1);

    return spliceBack;
  }
  console.log(employeeCheckboxes);

  return (
    <Paper className={root} style={{ overflow: 'none' }}>
      <Typography variant='h6' className={title}>
        Create New Job
      </Typography>
      <form onSubmit={(e) => onSubmit(e)} className={formElement}>
        <Container>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Job Info</FormLabel>
            <Grid container>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant='outlined'
                  label='Job Name'
                  value={jobName}
                  size='small'
                  onChange={handleChange('jobName')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant='outlined'
                  label='Customer Name'
                  value={customer}
                  size='small'
                  onChange={handleChange('jobName')}
                />
              </Grid>

              {Object.keys(location).map((field) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={field}>
                    <TextField
                      variant='outlined'
                      label={camelCaseToTextCase(field)}
                      value={location[field]}
                      size='small'
                      onChange={handleLocation(field)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </FormControl>
          <Grid container>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={4}>
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyy'
                  margin='normal'
                  id='date-picker'
                  label='Scheduled Date'
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin='normal'
                  id='time-picker'
                  label='Scheduled Time'
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Job Type</FormLabel>
                <RadioGroup
                  aria-label='job-type'
                  name='type1'
                  value={jobType}
                  onChange={handleChange('jobType')}
                >
                  <Grid container>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                      <FormControlLabel
                        value='flat'
                        control={<Radio />}
                        label='Flat'
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                      <FormControlLabel
                        value='wall'
                        control={<Radio />}
                        label='Wall'
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                      <FormControlLabel
                        value='other'
                        control={<Radio />}
                        label='Other'
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>

            <FormControl component='fieldset'>
              <FormLabel component='legend'>Schedule Employees</FormLabel>
              <Grid container>
                {employees.map((employee) => (
                  <Grid item xs={12} sm={4} md={3} lg={2} key={employee.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkboxes[employee]}
                          onChange={handleEmployeeCheckboxes(employee._id)}
                        />
                      }
                      label={`${employee.firstName} ${employee.lastName}`}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormControl>
          </Grid>
          <FormButton text='Submit' />
        </Container>
      </form>
    </Paper>
  );
}
