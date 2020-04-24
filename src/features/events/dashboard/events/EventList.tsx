import React, { Fragment,  useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { observer } from 'mobx-react-lite';
import EventStore from '../../../../app/store/eventStore';
import EventListStyles from './styles/eventListStyles';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Avatar from '@material-ui/core/Avatar';
import DateIcon from '@material-ui/icons/DateRange';
import Fab from '@material-ui/core/Fab';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import PlaceIcon from '@material-ui/icons/Place';

const EventList: React.FC = () => {
  const classes = EventListStyles();

  const eventStore = useContext(EventStore);
  const {
    selectEvent,
    eventListByDate,
  } = eventStore;


  return (
    <Fragment>
      {eventListByDate.map(([group, events]) => (
        <Fragment>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            className={classes.margin}
          >
            <DateIcon />
            {group}
          </Fab>
          {events.map((eventx) => (
            <Card style={{ marginBottom: '5em' }} key={eventx.id}>
              <CardHeader
             
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <CardMedia
                      className={classes.media}
                      image="/assets/user.png"
                      title="user name"
                    />
                   
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={<Button color="secondary">{eventx.title}</Button>}
                subheader='Hosted By Oluseyi'
              />

              <CardContent>
            
            <Typography variant="subtitle1" component="div">
            <DateIcon /> {eventx.date} @  <PlaceIcon/> {eventx.venue}; {eventx.city}
                </Typography>
              </CardContent>
              <Paper variant="outlined" square >
              <Typography variant="body2" color="textSecondary" component="p">
                  Attendees go here
                </Typography>
              </Paper>
              <CardActions disableSpacing>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="secondary"
                >
                  {eventx.category}
                </Button>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>

                <div style={{ float: 'right' }}>
                  <IconButton
                    onClick={() => selectEvent(eventx.id)}
                    aria-label="view"
                    className={classes.margin}
                    style={{ color: green[500] }}
                  >
                    <Link to={`/events/${eventx.id}`}>
                      <VisibilityIcon fontSize="small" />{' '}
                    </Link>
                  </IconButton>

                </div>
              </CardActions>
            </Card>
          ))}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(EventList);
