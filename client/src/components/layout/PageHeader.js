import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  IconButton,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem',
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function PageHeader({ headerIcon, title }) {
  const { root, titleBox } = useStyles();

  return (
    <Container>
      <Paper className={root}>
        <div className={titleBox}>
          <Typography variant='h5'>{title}</Typography>
          <IconButton href={`${title.toLowerCase()}/create`}>
            {headerIcon}
          </IconButton>
        </div>
      </Paper>
    </Container>
  );
}
