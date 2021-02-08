import React, { Fragment } from 'react';
import { IconButton, Typography, Grid } from '@material-ui/core';

export default function PageHeader({ headerIcon, title, path }) {
  return (
    <Grid item xs={12} md={6}>
      <Grid container alignItems='center'>
        <Grid item>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
        <Grid item>
          <IconButton href={path && `${title.toLowerCase()}${path}`}>
            {headerIcon}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
