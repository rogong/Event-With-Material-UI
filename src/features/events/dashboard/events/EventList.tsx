import React, { Fragment } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { IEvent } from '../../../../app/layout/models/activity';
import { green } from '@material-ui/core/colors';

import VisibilityIcon from '@material-ui/icons/Visibility';

interface IProps {
  events: IEvent[];
  selectEvent: (id: string) => void | null;
  deleteEvent: (id: string) => void;
}
const useStyles = makeStyles((theme: any) =>
  createStyles({
    card: {
      maxWidth: 400,
    },
    content: {
      marginTop: theme.spacing(1),
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    button: { margin: theme.spacing(2) },
    toolbarMargin: theme.mixins.toolbar,
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    red: {
      backgroundColor: red[900],
    },
    floatRight: {
      float: "right",
    }
  })
);

const EventList: React.FC<IProps> = ({ events, selectEvent, deleteEvent }) => {
  const classes = useStyles();
  return (
    <Fragment>
      {events.map((event) => (
        <Card style={{ marginBottom: '5em' }} key={event.id}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
                
              </IconButton>
            }
            title={<Button color="secondary">{event.title}</Button>}
            subheader={event.date}
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {event.description}
            </Typography>

            <Typography variant="subtitle1" component="div">
              {event.venue}; {event.city}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
            >
              Free
            </Button>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>

         

           <div style={{ float: "right" }}>
           <IconButton aria-label="delete" 
            className={classes.margin}
            style={{ color: green[500] }}
            onClick={() => selectEvent(event.id)} >
            
              <VisibilityIcon fontSize="small" />
            </IconButton>

            <IconButton 
            aria-label="delete" 
            style={{ color: red[900] }}
            className={classes.margin}
            onClick={() => deleteEvent(event.id)} >
            
              <DeleteIcon fontSize="small" />
            </IconButton>
           </div>

          </CardActions>
        </Card>
      ))}
      ;
    </Fragment>
  );
};

export default EventList;
