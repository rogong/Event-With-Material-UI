import React, { useState, useEffect, SyntheticEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Container } from '@material-ui/core';
import { IEvent } from '../../../../app/models/activity';
import { EventForm } from '../../form/EventForm';
import EventList from './EventList';
import DashboardEventDetails from './DashboardEventDetails';
import { NavBar } from '../../../nav/NavBar';
import agent from '../../../../app/api/agent';
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
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); 
  const [target, setTarget] = useState('');

  const handleOpenCreateForm = () => {
    setSelectedEvent(null);
    setEditMode(true);
  }
  const handleSelectEvent = (id: string) => {
    setSelectedEvent(events.filter((e) => e.id == id)[0]);
    setEditMode(false);
  };

  const handleCreateEvent = (event: IEvent) => {
    setSubmitting(true);
  agent.Events.create(event).then(()=>{
    setEvents([...events, event]);
    setSelectedEvent(event);
    setEditMode(false);
  }).then(()=>setSubmitting(false))
  }

  const handleEditEvent = (event: IEvent) => {
    setSubmitting(true);
  agent.Events.update(event).then(()=>{
    setEvents([...events.filter(a => a.id !== event.id), event]);
    setSelectedEvent(event);
    setEditMode(false);
  }).then(()=>setSubmitting(false))
  }

  const handleDeleteEvent = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
   agent.Events.delete(id).then(()=>{
  setTarget(event.currentTarget.name);
  setEvents([...events.filter(e => e.id !== id)]);
    }).then(()=>setSubmitting(false))
  }

  useEffect(() => {
    agent.Events.list()
    .then((res) => {
      let events: IEvent[] = [];
      res.forEach(event => {
        event.date = event.date.split('.')[0];
        events.push(event);
      })
      setEvents(events);
    }).then(()=>setLoading(false));
  }, []);

  if(loading) return <LoadingComponentLinear />;
 

  return (
    <div className={classes.root}>
          <NavBar openCreateForm={handleOpenCreateForm} />
      <Container>
        <Grid container spacing={4} style={{ marginTop: '5em' }}>
          <Grid item xs={12} sm={12} md={7}>
            <EventList 
            events={events} 
            selectEvent={handleSelectEvent}
            deleteEvent={handleDeleteEvent}
            submitting={submitting}
            target={target}
             />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
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
                submitting={submitting}
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
