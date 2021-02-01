import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import PropTypes from 'prop-types';
import Alert from '../../layout/Alert';

import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

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
});

function Customers({ setAlert }) {
  const [formData, setFormData] = useState({
    company: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    street: '',
    city: '',
    state: 'Georgia',
    zip: '',
  });

  const {
    company,
    firstName,
    lastName,
    phoneNumber,
    email,
    street,
    city,
    state,
    zip,
  } = formData;

  const { title, root, formControl, formButton } = useStyles();

  const handleChange = (name) => (e) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setAlert('Customer created successfully', 'success');
  };

  return (
    <Paper className={root}>
      <div>
        <Typography variant='h6' className={title}>
          Create New Customer
        </Typography>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <Container className={formControl}>
          <div className={title}>
            <Typography variant='subtitle2'>Customer Info</Typography>
          </div>
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                variant='outlined'
                label='Company'
                value={company}
                size='small'
                onChange={handleChange('company')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                variant='outlined'
                label='Email'
                value={email}
                size='small'
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                variant='outlined'
                label='First Name'
                value={firstName}
                size='small'
                onChange={handleChange('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                variant='outlined'
                label='Last Name'
                value={lastName}
                size='small'
                onChange={handleChange('lastName')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                variant='outlined'
                label='Phone Number'
                value={phoneNumber}
                size='small'
                onChange={handleChange('phoneNumber')}
              />
            </Grid>
          </Grid>
          <div>
            <Typography variant='subtitle2' className={title}>
              Address
            </Typography>
          </div>
          <Grid container>
            <Grid item>
              <TextField
                variant='outlined'
                label='Street'
                value={street}
                size='small'
                onChange={handleChange('street')}
              />
            </Grid>
            <Grid item>
              <TextField
                variant='outlined'
                label='City'
                value={city}
                size='small'
                onChange={handleChange('city')}
              />
            </Grid>
            <Grid item>
              <TextField
                variant='outlined'
                label='State'
                value={state}
                size='small'
                onChange={handleChange('state')}
              />
            </Grid>
            <Grid item>
              <TextField
                variant='outlined'
                label='Zipcode '
                value={zip}
                size='small'
                onChange={handleChange('zip')}
              />
            </Grid>
          </Grid>
          <Alert />

          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={formButton}
            size='large'
            style={{ width: '40%' }}
          >
            Submit
          </Button>
        </Container>
      </form>
    </Paper>
  );
}

Customers.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Customers);