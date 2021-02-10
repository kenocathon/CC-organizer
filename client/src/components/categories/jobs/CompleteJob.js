import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../layout/PageHeader';
import useGetRequest from '../../hooks/useGetRequest';
import { listAssets, singleAsset } from '../../../api/api-get';

//Material UI
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';

const CompleteJob = () => {
  const { jobId } = useParams();
  const { data: job } = useGetRequest(singleAsset, `/job/${jobId}`);
  const { data: employees } = useGetRequest(listAssets, '/employees');

  const [checkedIds, setCheckedIds] = useState([]);

  return (
    <>
      <PageHeader
        title='Complete Job'
        headerIcon={<AssignmentTurnedInIcon />}
      />
      <Grid container>
        <Grid item>
          <h3>Complete {job.jobName}</h3>
        </Grid>
        <Grid item>
          {employees &&
            employees.map((employee) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedIds.find((id) => id === employee._id)}
                    onChange={({ target: { checked } }) =>
                      setCheckedIds((prev) =>
                        checked
                          ? [...prev, employee._id]
                          : prev.filter((id) => id !== employee._id)
                      )
                    }
                    name='checkedA'
                  />
                }
                label='Secondary'
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default CompleteJob;
