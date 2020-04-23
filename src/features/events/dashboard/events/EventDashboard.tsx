import React, { useEffect, useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Container } from '@material-ui/core';
import { EventForm } from '../../form/EventForm';
import EventList from './EventList';
import DashboardEventDetails from './DashboardEventDetails';
import EventStore from '../../../../app/store/eventStore';
import  { observer } from 'mobx-react-lite';
import LoadingComponentLinear from '../../../../app/layout/LoadingComponentLinear';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      textAlign: 'center',
    },

    toolbarMargin: theme.mixins.toolbar,
  })
);

const EventDashboard = () => {
  const classes = useStyles();
  const eventStore = useContext(EventStore);
  const {editMode, selectedEvent } = eventStore;

  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);


  if(eventStore.loadingInitial) return <LoadingComponentLinear />;
    
  return (
    <div className={classes.root}>
       
      <Container>
        <Grid container spacing={4} style={{ marginTop: '5em' }}>
          <Grid item xs={12} sm={12} md={7}>
            <EventList  />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            {selectedEvent && !editMode && (
              <DashboardEventDetails />)}
            {editMode && (
              <Paper className={classes.paper}>
                <EventForm 
                key={selectedEvent && selectedEvent.id || 0}
                event={selectedEvent!} 
                />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default observer(EventDashboard);
