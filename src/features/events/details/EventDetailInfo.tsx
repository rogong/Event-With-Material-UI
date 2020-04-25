import React from 'react';
import { List, ListItem, ListItemText, Divider, Paper, Theme, createStyles, makeStyles } from '@material-ui/core';
import DateIcon from '@material-ui/icons/DateRange';
import PlaceIcon from '@material-ui/icons/Place';
import InfoIcon from '@material-ui/icons/Info';
import { IEvent } from '../../../app/models/activity';
import { format } from 'date-fns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);


const EventDetailInfo: React.FC<{event: IEvent}> = ({event}) => {
const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper} style={{marginTop:'2em'}}>
      <List
        component="nav"
        aria-label="mailbox folders"
      >
        <ListItem button>
         <InfoIcon color='secondary'/> <ListItemText primary={event.description} />
        </ListItem>
        <Divider />
        <ListItem button divider>
        <DateIcon color='secondary'/> 
         <ListItemText 
         primary={format(event.date!, 'eeee do MMMM')} 
         secondary= {format(event.date!, 'h:mm a')} />
        </ListItem>
        <ListItem button>
         <PlaceIcon color='secondary'/> 
         <ListItemText primary={event.venue} />,
         <ListItemText primary={event.city} />
        </ListItem>
       
      </List>
      </Paper>
    </div>
  );
};

export default EventDetailInfo;
