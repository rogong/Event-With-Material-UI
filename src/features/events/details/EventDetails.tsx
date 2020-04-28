import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import  EventDetailHeader  from './EventDetailHeader';
import  EventDetailSidebar  from './EventDetailSidebar';
import  EventDetailInfo  from './EventDetailInfo';
import { EventDetailChat } from './EventDetailChat';
import LoadingComponentLinear from '../../../app/layout/LoadingComponentLinear';
import { Container } from '@material-ui/core';
import { RootStoreContext } from '../../../app/store/rootStore';


interface DetailParams {
  id: string
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const EventDetails:React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
    //Open Store .................................
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);
     
    const {
      event,
      loadEvent,
      loadingInitial
    } = rootStore.eventStore;
  
    //Close Store .................................
    useEffect(() => {
      loadEvent(match.params.id);
    }, [loadEvent,match.params.id,history])

    if(loadingInitial || !event) return <LoadingComponentLinear />;
    
    if(!event)
      return <h2>Event not found</h2>
  return (
    <div className={classes.root}>
    <Container>
      <Grid container spacing={4}>

        <Grid item xs={12} sm={12} lg={7}>
        <EventDetailHeader event={event!}/>
        <EventDetailInfo event={event} />
        <EventDetailChat />
        </Grid>

        <Grid item xs={12} sm={12} lg={1}></Grid>

        <Grid item xs={12} sm={12} lg={4}>
        <EventDetailSidebar attendees={event.attendees} />
      
      </Grid>

      </Grid>
      </Container>
    </div>
  );
  };


export default observer(EventDetails)