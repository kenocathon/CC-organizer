import React from 'react';
import { listAssets, searchAssets } from '../../../api/api-get';
import useGetRequest from '../../hooks/useGetRequest';
import PageHeader from '../../layout/PageHeader';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import Search from '../../Search';
import { Grid } from '@material-ui/core';

function Employees() {
  const { data: employees } = useGetRequest(listAssets, '/employees');

  return (
    <Grid container>
      <PageHeader
        title='Employees'
        headerIcon={<AccessibilityNewIcon />}
        path='/create'
      />
      <Search data={employees} from='emoployees' />
    </Grid>
  );
}

export default Employees;
