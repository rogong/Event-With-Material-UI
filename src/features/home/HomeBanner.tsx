import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(0),
      color: theme.palette.text.secondary,
      width: 1280,
      height:500,
     
    },
 
    toolbarMargin: theme.mixins.toolbar,
  })
);

export const HomeBanner = () => {
    const classes = useStyles();
    return (
        <div>
        <Grid>
          <Grid item xs="auto" sm="auto" md="auto">
            <Paper className={classes.paper}>
              <img alt="complex" src="/img/9851328675.jpg" height="500" width="1480"/>
            </Paper>
          </Grid>
        </Grid>
        </div>
    )
}
