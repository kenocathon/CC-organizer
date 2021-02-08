import React from 'react';
import PageHeader from '../../layout/PageHeader';
import Search from '../../Search';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import useGetRequest from '../../hooks/useGetRequest';
import { searchAssets } from '../../../api/api-get';
import { Grid } from '@material-ui/core';

export default function Jobs() {
  const { data: jobs } = useGetRequest(searchAssets, '/jobs');

  function consolidateData(dataArray) {
    return dataArray.map((obj) => ({
      _id: obj._id,
      customerName: `${obj.customer.firstName} ${obj.customer.lastName}`,
      jobName: obj.jobName,
      jobType: obj.jobType,
      street: obj.location.street,
    }));
  }
  console.log(consolidateData(jobs));
  return (
    <Grid container alignItems='center'>
      <PageHeader title='Jobs' headerIcon={<LibraryAddIcon />} path='/create' />
      <Search data={consolidateData(jobs)} from='jobs' />
    </Grid>
  );
}
