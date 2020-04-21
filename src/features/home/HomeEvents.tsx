import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { IEvent } from '../../app/layout/models/activity';
import EventCard from './EventCard';

interface IProps {
  events: IEvent[];
  selectEvent: (id:string) => void;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },

    media: {
      height: 140,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    toolbarMargin: theme.mixins.toolbar,
  })
);
export const HomeEvent: React.FC<IProps> = ({events,selectEvent}) => {
  const classes = useStyles();
  const Container = (props: any) => <Grid container {...props} />;
  const Item = (props: any) => <Grid item xs={12} sm={6} md={4} {...props} />;
  return (
    <div className={classes.root}>
      <Container spacing={3} className={classes.toolbarMargin}>
        {events.map((event) => (
          <Item>
            <EventCard event={event} selectEvent={selectEvent}/>
          </Item>
        ))}
      </Container>
    </div>
  );
};
