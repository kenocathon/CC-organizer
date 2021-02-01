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
    padding: '2rem'
  },
  content: {
    marginBottom: '1rem',
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function PageHeader({ headerIcon, title, path }) {
  const { root, content, titleBox } = useStyles();

  return (
    <Container className={content}>
      <Paper className={root}>
        <div className={titleBox}>
          <Typography variant='h5'>{title}</Typography>
          <IconButton href={path && `${title.toLowerCase()}${path}`}>
            {headerIcon}
          </IconButton>
        </div>
      </Paper>
    </Container>
  );
}
