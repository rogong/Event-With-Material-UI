import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Container } from '@material-ui/core';
import EventList from './EventList';
import  { observer } from 'mobx-react-lite';
//import LoadingComponentLinear from '../../../../app/layout/LoadingComponentLinear';
//import EventStore from '../../../../app/store/eventStore';

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
/*  const eventStore = useContext(EventStore);
 const {loadingInitial } = eventStore;

 useEffect(() => {
  eventStore.loadEvents();
}, [eventStore]);

 if(loadingInitial) return <LoadingComponentLinear />; */
    
  return (
    <div className={classes.root}>
       
      <Container>
        <Grid container spacing={4} style={{ marginTop: '5em' }}>
          <Grid item xs={12} sm={12} md={7}>
            <EventList  />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            
              <Paper className={classes.paper}>
                <h1>Events Filter</h1>
              </Paper>
          
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default observer(EventDashboard);
