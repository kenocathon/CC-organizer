import React, { useState, useEffect } from 'react';
import { listAssets } from '../../../api/api-get';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { createAsset } from '../../../api/api-post';

import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
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
  const { title, root, formElement } = useStyles();

  const [location, setLocation] = useState({
    street: '',
    city: '',
    state: 'GA',
    zipcode: '',
    lotNumber: '',
    subdivision: '',
  });
  const currentYear = new Date().getFullYear();
  const [inputFieldData, setInputFieldData] = useState({
    jobName: '',
    customer: '',
    notes: '',
    status: 'Unscheduled',
  });
  const { jobName, customer } = inputFieldData;

  const [jobType, setJobType] = useState('Flat');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const { data: customers } = useGetRequest(listAssets, '/customers');

  useEffect(() => {
    setInputFieldData({
      ...inputFieldData,
      jobName: `jb/${
        location.subdivision &&
        location.subdivision
          .split(/\s/)
          .reduce((response, word) => (response += word.slice(0, 3)), '')
      }-${location.lotNumber || '00'}/${currentYear}`,
    });
  }, [location.subdivision, location.lotNumber]);

  const onSubmit = (e) => {
    e.preventDefault();
    const job = {
      customer: inputFieldData.customer,
      jobName: inputFieldData.jobName,
      jobType,
      payType: () => {
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
      status: 'Unscheduled',
    };

    createAsset(job, '/jobs');
  };

  const handleChange = (name) => (e) => {
    if (name === 'jobType') {
      setJobType(e.target.value);
    } else {
      setInputFieldData({ ...inputFieldData, [name]: e.target.value });
    }
  };

  const handleCustomer = (e) => {
    setInputFieldData({ ...inputFieldData, customer: e.target.value });
  };

  const handleLocation = (name) => (e) => {
    setLocation({ ...location, [name]: e.target.value });
  };

  function camelCaseToTextCase(str) {
    const result = str.replace(/([A-Z])/g, ' $1');
    const spliceBack = result.charAt(0).toUpperCase() + result.slice(1);

    return spliceBack;
  }

  return (
    <Paper className={root} style={{ overflow: 'none' }}>
      <Typography variant='h6' className={title}>
        Create New Job
      </Typography>
      <form onSubmit={(e) => onSubmit(e)} className={formElement}>
        <Container>
          <Grid container>
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
                <FormControl variant='outlined'>
                  <InputLabel id='customer-name'>Customer Name</InputLabel>
                  <Select
                    labelId='customer-label'
                    id='customer-select'
                    value={customer.name}
                    onChange={handleCustomer}
                    style={{ height: '2.4rem' }}
                  >
                    {customers &&
                      customers.map((person) => (
                        <MenuItem value={person._id}>
                          {person.firstName + ' ' + person.lastName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
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
                  onChange={setSelectedDate}
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
                  value={selectedTime}
                  onChange={setSelectedTime}
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
                        value='Flat'
                        control={<Radio />}
                        label='Flat'
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                      <FormControlLabel
                        value='Wall'
                        control={<Radio />}
                        label='Wall'
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                      <FormControlLabel
                        value='Other'
                        control={<Radio />}
                        label='Other'
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <FormButton text='Submit' />
        </Container>
      </form>
    </Paper>
  );
}
