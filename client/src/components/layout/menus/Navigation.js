import React, { useState } from 'react';
import clsx from 'clsx';

//Icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

//MUI Components
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Divider,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItems from './ListItems';

//Content and Routing
import { Route } from 'react-router-dom';
import Dashboard from '../../layout/dashboard/Dashboard';
import Jobs from '../../categories/jobs/Jobs';
import Customers from '../../categories/customers/Customers';
import Employees from '../../categories/employees/Employees';
import Calendar from '../../calendar/Calendar';
import Purchasing from '../../categories/purchasing/Purchasing';
import CreateCustomer from '../../categories/customers/CreateCustomer';
import PrivateRoute from '../../../api/auth/PrivateRoute';
import CreateJob from '../../categories/jobs/CreateJob';
import CompletJob from '../../categories/jobs/CompleteJob';

const drawerWidth = '240px';

const styles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}));

const Navigation = () => {
  const classes = styles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <IconButton
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Complete Crete Job Organizer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <ListItems />
      </Drawer>

      <div className={classes.drawerHeader} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.content}>
          <PrivateRoute>
            <Route exact path='/dashboard' render={() => <Dashboard />} />
            <Route exact path='/jobs' render={() => <Jobs />} />
            <Route path='/jobs/create' render={() => <CreateJob />} />
            <Route path='/jobs/complete/:jobId' render={() => <CompletJob />} />
            <Route exact path='/customers' render={() => <Customers />} />
            <Route path='/customers/create' render={() => <CreateCustomer />} />
            <Route exact path='/employees' render={() => <Employees />} />
            <Route exact path='/calendar' render={() => <Calendar />} />
            <Route exact path='/purchasing' render={() => <Purchasing />} />
          </PrivateRoute>
        </div>
      </main>
    </div>
  );
};

export default Navigation;
