import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Container } from '@material-ui/core';
import { IEvent } from '../../../../app/layout/models/activity';
import { EventForm } from '../../form/EventForm';
import EventList from './EventList';
import DashboardEventDetails from './DashboardEventDetails';
import { NavBar } from '../../../nav/NavBar';

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
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () => {
    setSelectedEvent(null);
    setEditMode(true);
  }
  const handleSelectEvent = (id: string) => {
    setSelectedEvent(events.filter((e) => e.id == id)[0]);
    setEditMode(false);
  };

  const handleCreateEvent = (event: IEvent) => {
    setEvents([...events, event]);
    setSelectedEvent(event);
    setEditMode(false);
  }

  const handleEditEvent = (event: IEvent) => {
    setEvents([...events.filter(a => a.id !== event.id), event]);
    setSelectedEvent(event);
    setEditMode(false);
  }

  const handleDeleteEvent = (id: string) => {
    setEvents([...events.filter(e => e.id !== id)]);
  }

  useEffect(() => {
    axios.get<IEvent[]>('http://localhost:5000/api/activities')
    .then((res) => {
      let events: IEvent[] = [];
      res.data.forEach(event => {
        event.date = event.date.split('.')[0];
        events.push(event);
      })
      setEvents(res.data);
    });
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
          <NavBar openCreateForm={handleOpenCreateForm} />
      <Container>
        <Grid container spacing={4} style={{ marginTop: '5em' }}>
          <Grid item xs={12} sm={12} md={6}>
            <EventList 
            events={events} 
            selectEvent={handleSelectEvent}
            deleteEvent={handleDeleteEvent}
             />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            {selectedEvent && !editMode && (
              <DashboardEventDetails
                event={selectedEvent}
                setEditMode={setEditMode}
                setSelectedEvent={setSelectedEvent}
               
              />
            )}
            {editMode && (
              <Paper className={classes.paper}>
                <EventForm 
                key={selectedEvent && selectedEvent.id || 0}
                setEditMode={setEditMode} 
                event={selectedEvent!} 
                createEvent={handleCreateEvent}
                editEvent={handleEditEvent}
                />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EventDashboard;
