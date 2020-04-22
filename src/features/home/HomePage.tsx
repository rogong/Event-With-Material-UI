import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { NavBar } from '../../features/nav/NavBar';
import Container from '@material-ui/core/Container';
import Footer from '../../features/footer/Footer';
import { HomeBanner } from '../../features/home/HomeBanner';
import { HomeEvent } from '../../features/home/HomeEvents';
import { EventDetails } from '../../features/events/details/EventDetails';
import { IEvent } from '../../app/models/activity';

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
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  
  const handleSelectedEvent = (id:string) => {
     setSelectedEvent(events.filter(e => e.id == id )[0])
  };

  const classes = useStyles();
  useEffect(() => {
    axios.get<IEvent[]>('http://localhost:5000/api/activities').then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <div className={classes.root}>
  
      <HomeBanner/>
  
      <Container  >
        <HomeEvent events={events} selectEvent={handleSelectedEvent} />
       
      </Container>
      
    <Footer/>
    </div>
  );
};

export default HomePage;
