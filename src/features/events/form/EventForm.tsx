import React, { useState, FormEvent, Fragment, useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IEvent } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ButtonIndicatorEdit from '../../../app/layout/ButtonIndicatorEdit';
import EventStore from '../../../app/store/eventStore';
import { RouteComponentProps } from 'react-router-dom';
import  { observer }  from 'mobx-react-lite';
import { Grid, Paper, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: { margin: theme.spacing(2) },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      textAlign: 'center',
    },
  })
);

interface DetailParams {
  id: string;
}

 const EventForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history}) => {
  const classes = useStyles();
  //Store
  const eventStore = useContext(EventStore);
  const { 
    createEvent, 
    editEvent, 
    submitting, 
    loadEvent,
    clearEvent,
    event:initialFormState
  } = eventStore;


  const [eventx, setEvent] = useState<IEvent>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });
  
  useEffect(() => {
    if(match.params.id && eventx.id.length === 0) {
      loadEvent(match.params.id).then(
        () => initialFormState && setEvent(initialFormState)
      );
    }
   return () => {
     clearEvent();
   }
  },[loadEvent,
     match.params.id,
     clearEvent,
     initialFormState,
     eventx.id.length
    ]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (eventx.id.length === 0) {
      let newEvent = {
        ...eventx,
        id: uuid(),
      };
      createEvent(newEvent).then(() => history.push(`/events/${newEvent.id}`));
    } else {
      editEvent(eventx).then(() => history.push(`/events/${eventx.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setEvent({ ...eventx, [name]: value });
  };

  return (
    <Container>
        <Grid container spacing={4} style={{ marginTop: '5em' }}>
          <Grid item xs={12} sm={12} md={7}>
          <Fragment >
      <form onSubmit={handleSubmit} >
        <TextField
          onChange={handleInputChange}
          name="title"
          variant="outlined"
          margin="dense"
          id="title"
          label="title"
          required
          value={eventx.title}
          fullWidth
        />

        <TextField
          onChange={handleInputChange}
          name="category"
          variant="outlined"
          margin="dense"
          id="category"
          label="Category"
          required
          value={eventx.category}
          fullWidth
        />

        <TextField
          onChange={handleInputChange}
          name="city"
          variant="outlined"
          margin="dense"
          id="city"
          label="City"
          value={eventx.city}
          required
          fullWidth
        />
        <TextField
          onChange={handleInputChange}
          name="venue"
          variant="outlined"
          margin="dense"
          id="venue"
          label="Venue"
          required
          value={eventx.venue}
          fullWidth
        />
        <TextField
          onChange={handleInputChange}
          name="date"
          variant="outlined"
          margin="dense"
          id="date"
          value={eventx.date}
          type="datetime-local"
          fullWidth
        />
        <TextField
          onChange={handleInputChange}
          name="description"
          variant="outlined"
          margin="dense"
          id="description"
          label="Description"
          value={eventx.description}
          multiline
          rows={4}
          required
          fullWidth
        />

        <ButtonIndicatorEdit
          color="primary"
          aria-label="submit"
          loading={submitting}
          type="submit"
          variant="outlined"
        />

        <Button
          className={classes.button}
          variant="outlined"
          color="default"
          onClick={() => history.push('/events')}
        >
          Cancel
        </Button>
      </form>
    </Fragment>
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            
              <Paper className={classes.paper}>
                <h1>Ads</h1>
              </Paper>
          
          </Grid>
        </Grid>
      </Container>
   
  );
};

export default observer(EventForm);