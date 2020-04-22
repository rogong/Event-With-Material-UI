import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      button: {
        margin: theme.spacing(2),
      },
      placeholder: {
        height: 40,
      },
  }),
);

const LoadingComponentCircular = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        
        <CircularProgress color="secondary" />
      </div>
    )
}

export default LoadingComponentCircular


