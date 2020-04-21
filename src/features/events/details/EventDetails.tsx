import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(0),
      color: theme.palette.text.secondary,
      width: 1280,
      height: 500,
      backgroundImage: '/img/event-image-1566027094-7P6Iq.jpg',
    },

    toolbarMargin: theme.mixins.toolbar,
  })
);
export const EventDetails = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
      
    </div>
  );
};
