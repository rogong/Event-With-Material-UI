import React, {useContext, useEffect} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Container } from '@material-ui/core';
import EventList from './EventList';
import  { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../../app/store/rootStore';


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
  const rootStore = useContext(RootStoreContext);
  const {loadEvents} = rootStore.eventStore;
  
  useEffect(() => {
  loadEvents();
   }, [loadEvents]);
   
  return (
    <div className={classes.root}>
       
      <Container>
        <Grid container spacing={4} style={{ marginTop: '5em' }}>
        <Grid item xs={1} sm={1} md={1}> </Grid>
           
         
          <Grid item xs={12} sm={6} md={6}>
            <EventList  />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            
              <Paper className={classes.paper}>
                <h1>Events Filter</h1>
              </Paper>
          
          </Grid>

          <Grid item xs={1} sm={1} md={1}> </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default observer(EventDashboard);
