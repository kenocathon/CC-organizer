import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DataTable({ data, from }) {
  const classes = useStyles();
  const columns = data[0] && Object.keys(data[0]);

  function camelCaseToTextCase(str) {
    const result = str.replace(/([A-Z])/g, ' $1');
    const spliceBack = result.charAt(0).toUpperCase() + result.slice(1);

    return spliceBack;
  }

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='Data Table'>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              {columns &&
                columns.map((heading) => {
                  if (heading !== '_id') {
                    return (
                      <TableCell key={heading}>
                        {camelCaseToTextCase(heading)}
                      </TableCell>
                    );
                  }
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <Grid container direction='row'>
                    {from && from === 'jobs' && (
                      <Grid item>
                        <IconButton>
                          <AssignmentTurnedInIcon
                            fontSize='small'
                            color='action'
                          />
                        </IconButton>
                      </Grid>
                    )}
                    <Grid item>
                      <IconButton>
                        <DeleteIcon color='error' fontSize='small' />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton href={`jobs/complete/${row._id}`}>
                        <EditIcon color='primary' fontSize='small' />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
                {columns.map((column, ind) => {
                  if (!row[column]) {
                    return <TableCell key={ind}>N/A</TableCell>;
                  } else if (row[column] !== row._id) {
                    return <TableCell key={ind}>{row[column]}</TableCell>;
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
