import { useState } from 'react';
import {
  Container,
  IconButton,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem',
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
  },
  searchBox: {
    width: '80%',
    padding: '.25rem',
  },
}));

export default function Search({ pageTitle, data }) {
  const { root, searchBox, titleBox } = useStyles();

  const initialState = {
    options: data[0] && Object.keys(data[0]),
  };

  const [query, setquery] = useState('');
  const [selectedOption, setSelectedOption] = useState(initialState.options);

  function search(rows) {
    return rows.filter((row) =>
      initialState.options.some((option) => {
        return row[option]
          .toString()
          .toLowerCase()
          .indexOf(query.toLowerCase() > -1);
      })
    );
  }

  function camelCaseToTextCase(str) {
    const result = str.replace(/([A-Z])/g, ' $1');
    const spliceBack = result.charAt(0).toUpperCase() + result.slice(1);

    return spliceBack;
  }

  return <div>Search</div>;
}
