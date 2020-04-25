import React, { useState, Fragment, useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
import EventStore from '../../../app/store/eventStore';
import { RouteComponentProps } from 'react-router-dom';
import  { observer }  from 'mobx-react-lite';
import { Grid, Paper, Container } from '@material-ui/core';
import { Form as FinalForm, Field } from "react-final-form";
import { Segment, Form, Button} from "semantic-ui-react";
import TextAreaInput from "../../../app/shared/form/TextAreaInput";
import SelectInput from "../../../app/shared/form/SelectInput";
import { category } from "../../../app/shared/options/categoryOptions";
import DateInput from "../../../app/shared/form/DateInput";
import { combineDateAndTime } from "../../../app/shared/util/util";
import {combineValidators, isRequired, hasLengthGreaterThan, composeValidators} from 'revalidate';
import  {EventFormValues}  from '../../../app/models/activity';
import TextInput from '../../../app/shared/form/TextInput';

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

const validate = combineValidators({
  title: isRequired({message: 'The title is required'}),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
})

interface DetailParams {
  id: string;
}

const EventForm: React.FC<RouteComponentProps<DetailParams>> = ({ 
  match, 
  history
}) => {
  const classes = useStyles();
  //Store
  const eventStore = useContext(EventStore);
  const {  
    submitting, 
    loadEvent,
    createEvent,
    editEvent
  } = eventStore;

  const [event, setEvent] = useState(new EventFormValues());
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadEvent(match.params.id)
        .then(event => setEvent(new EventFormValues(event)))
        .finally(() => setLoading(false));
    }
  }, [loadEvent, match.params.id]);


  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...event } = values;
    event.date = dateAndTime;
    if (!event.id) {
            let newEvent = {
              ...event,
              id: uuid()
            };
            createEvent(newEvent);
          } else {
            editEvent(event);
          }
  };

 

  return (
    <Container>
        <Grid container spacing={4} style={{ marginTop: '5em' }}>
          <Grid item xs={12} sm={12} md={7}>
          <Fragment >
          <Segment clearing >
          <FinalForm
          validate={validate}
            initialValues={event}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={event.title}
                  component={TextInput}
                />
                <Field
              
                  component={TextAreaInput}
                  name="description"
                  placeholder="Description"
                  value={event.description}
                  rows={3}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  name="category"
                  placeholder="Category"
                  value={event.category}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={event.date}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={event.date}
                  />
                </Form.Group>
                <Field
                  component={TextInput}
                  name="city"
                  placeholder="City"
                  value={event.city}
                />
                <Field
                  component={TextInput}
                  name="venue"
                  placeholder="Venue"
                  value={event.venue}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    event.id ?
                    () => history.push(`/events/${event.id}`) :
                    () => history.push("/events")}
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
     
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