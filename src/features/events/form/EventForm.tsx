import React, { useState, FormEvent, Fragment, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IEvent } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ButtonIndicatorEdit from '../../../app/layout/ButtonIndicatorEdit';
import EventStore from '../../../app/store/eventStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: { margin: theme.spacing(2) },
  })
);

interface IProps {
  event: IEvent;
}

export const EventForm: React.FC<IProps> = ({ event: initialState }) => {
  const classes = useStyles();

  //Store
  const eventStore = useContext(EventStore);
  const { createEvent, editEvent, submitting, cancelFormOpen } = eventStore;

  const initializeForm = () => {
    if (initialState) {
      return initialState;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
      };
    }
  };
  const [eventx, setEvent] = useState<IEvent>(initializeForm);
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setEvent({ ...eventx, [name]: value });
    console.log(eventx);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (eventx.id.length === 0) {
      let newEvent = {
        ...eventx,
        id: uuid(),
      };
      createEvent(newEvent);
    } else {
      editEvent(eventx);
    }
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
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
          onClick={cancelFormOpen}
        >
          Cancel
        </Button>
      </form>
    </Fragment>
  );
};
