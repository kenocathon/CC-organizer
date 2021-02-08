import { Fragment, useState } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import DataTable from './DataTable';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '10rem',
    '& .MuiFormControl-root': {
      minWidth: '6rem',
    },
  },
}));

export default function Search({ data, from }) {
  const classes = useStyles();

  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(
    from === 'jobs' ? 'customerName' : 'firstName'
  );

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  function search(dataToSearch) {
    return dataToSearch.filter(
      (dataToSearch) =>
        dataToSearch[selectedOption]
          .toLowerCase()
          .indexOf(query.toLowerCase()) > -1
    );
  }

  console.log(search(data));

  function camelCaseToTextCase(str) {
    const result = str.replace(/([A-Z])/g, ' $1');
    const spliceBack = result.charAt(0).toUpperCase() + result.slice(1);

    return spliceBack;
  }

  return (
    <Fragment>
      <Grid container xs={6} md={4} style={{ marginBottom: '2rem' }}>
        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Filter By:</InputLabel>
            <Select
              labelId='filter-select'
              id='filter-select'
              value={selectedOption}
              onChange={handleChange}
            >
              {data[0] &&
                Object.keys(data[0]).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key !== '_id' && camelCaseToTextCase(key)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            label='Search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
      </Grid>
      <DataTable data={search(data)} from='jobs' />
    </Fragment>
  );
}
