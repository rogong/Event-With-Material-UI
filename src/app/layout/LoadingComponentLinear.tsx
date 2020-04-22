import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';



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

const LoadingComponentLinear = () => {
    const classes = useStyles();
    return (
        <div >
        
        <LinearProgress color="secondary" />
      </div>
    )
}

export default LoadingComponentLinear


