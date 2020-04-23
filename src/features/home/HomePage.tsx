import React, {useContext, useEffect}  from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Footer from '../../features/footer/Footer';
import { HomeBanner } from '../../features/home/HomeBanner';
import EventCard from './EventCard';
import { observer } from 'mobx-react-lite';
import EventStore from '../../app/store/eventStore';
import { Container } from '@material-ui/core';
import LoadingComponentLinear from '../../app/layout/LoadingComponentLinear';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(0),
      color: theme.palette.text.secondary,
      width: 1280,
      height:500,
    },
 
    toolbarMargin: theme.mixins.toolbar,
  })
);
const HomePage = () => {


  const classes = useStyles();

  
  const eventStore = useContext(EventStore);
  //const {eventsByDate: events, selectEvent} = eventStore;

  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);

  if(eventStore.loadingInitial) return <LoadingComponentLinear  />;
  return (
    <div className={classes.root}>
  
      <HomeBanner/>
  
   <Container>
   <EventCard  />
   </Container>
       
      
      
    <Footer/>
    </div>
  );
};

export default observer(HomePage);
