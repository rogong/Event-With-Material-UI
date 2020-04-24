import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react-lite';
import eventDetailStyles from '../dashboard/events/styles/eventDetailStyles';
import { IEvent } from '../../../app/models/activity';
import { CardHeader, Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DateIcon from '@material-ui/icons/DateRange';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';
import JoinIcon from '@material-ui/icons/AddCircle';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';



const EventDetailHeader: React.FC<{event: IEvent }> = ({event}) => {
  const classes = eventDetailStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <Card style={{ marginTop: '5em' }}>
     
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {`/assets/categoryImages/${event.category}.jpg`}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Button color="secondary">{event.title}</Button>}
        subheader= {<Fab
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
        className={classes.margin}
      >
        <DateIcon />
        {event.date} 
        </Fab> } 
      />
    
      <CardMedia
        className={classes.media}
        image={`/assets/categoryImages/${event.category}.jpg`}
        title="Paella dish"
      />
      <CardContent>
        <Button variant='text' color='primary'>
        {`posted by ${event.city}`}
        </Button>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
        >
          Free
        </Button>

        <Button
          className={classes.button}
          variant="text"
          color="secondary"
          size='small' 
          onClick={handleToggle}  
        >
         Attend <JoinIcon/>
        </Button>

        <Button
          className={classes.button}
          variant="text"
          color="default"
          size='small'  
          onClick={handleToggle} 
        >
          Cancel <CancelIcon/>
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          size='small'   
          onClick={handleToggle}  
        >
       Manage 

        </Button>

       
      </CardActions>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
};
export default observer(EventDetailHeader);
