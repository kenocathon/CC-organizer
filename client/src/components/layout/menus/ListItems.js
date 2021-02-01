import React, { Fragment } from 'react';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

//Icons
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    '&:hover': {
      color: '#647AA3',
      opacity: '.2',
      textDecoration: 'none',
    },
  },
});

export default function ListItems() {
  const { link } = useStyles();

  const icons = [
    <PeopleIcon />,
    <WorkIcon />,
    <PeopleAltIcon />,
    <MonetizationOnIcon />,
    <DateRangeIcon />,
  ];

  return (
    <Fragment>
      <List>
        {['Customers', 'Jobs', 'Employees', 'Purchasing', 'Calendar'].map(
          (text, index) => (
            <Link href={`/${text.toLowerCase()}`} className={link} key={text}>
              <ListItem button>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          )
        )}
      </List>
      <Divider />
      {/* <List>
        {['Jobs', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Fragment>
  );
}
