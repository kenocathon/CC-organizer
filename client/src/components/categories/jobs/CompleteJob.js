import React, {useEffect, useState} from 'react';
import PageHeader from '../../layout/PageHeader'
import useGetRequest from '../../hooks/useGetRequest';
import {listAssets} from '../../../api/api-get'

//Icon
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid } from '@material-ui/core';
import {listEmployees} from '../../../api/api-employee'

const CompleteJob = () => {

  const [employeeCheckboxes, setEmployeeCheckboxes] = useState({});

  const { data: employees} = useGetRequest(listEmployees);

  console.log(employees)

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

  const handleEmployeeCheckboxes = (name) => (e) => {
    const checkboxes = employeeCheckboxes.checkboxes;
    checkboxes[name] = e.target.checked;
    setEmployeeCheckboxes({ checkboxes });
  };

  return (
    <div>
      <PageHeader title='Complete Job' headerIcon={<AssignmentTurnedInIcon />} />
      <FormControl component='fieldset'>
              <FormLabel component='legend'>Select Employees That Worked</FormLabel>
              <Grid container>
                {employees.length > 0 && employees.map((employee) => (
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

    </div>
  );
}

export default CompleteJob;
