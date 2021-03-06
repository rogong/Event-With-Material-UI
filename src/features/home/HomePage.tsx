import React, { useContext, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Footer from '../../features/footer/Footer';
import { HomeBanner } from '../../features/home/HomeBanner';
import EventCard from './EventCard';
import { observer } from 'mobx-react-lite';
import { Container } from '@material-ui/core';
import { RootStoreContext } from '../../app/store/rootStore';

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
 const rootStore = useContext(RootStoreContext);
 const {loadEvents} = rootStore.eventStore;
 
 useEffect(() => {
 loadEvents();
  }, [loadEvents]);
  

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
