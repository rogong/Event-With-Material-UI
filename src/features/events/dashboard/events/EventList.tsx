import React, { Fragment, SyntheticEvent, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ButtonComponent from '../../../../app/layout/ButtonIndicator';
import { observer } from 'mobx-react-lite';
import EventStore from '../../../../app/store/eventStore';
import EventListStyles from './styles/eventListStyles';

const EventList: React.FC = () => {
  const classes = EventListStyles();

  const eventStore = useContext(EventStore);
  const {
    eventsByDate,
    selectEvent,
    deleteEvent,
    submitting,
    target,
  } = eventStore;

  return (
    <Fragment>
      {eventsByDate.map((eventx) => (
        <Card style={{ marginBottom: '5em' }} key={eventx.id}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={<Button color="secondary">{eventx.title}</Button>}
            subheader={eventx.date}
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {eventx.description}
            </Typography>

            <Typography variant="subtitle1" component="div">
              {eventx.venue}; {eventx.city}
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

            <div style={{ float: 'right' }}>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                style={{ color: green[500] }}
                onClick={() => selectEvent(eventx.id)}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>

              <ButtonComponent
                color="primary"
                type="submit"
                name={eventx.id}
                aria-label="delete"
                style={{ color: red[900] }}
                className={classes.margin}
                onClick={(e: SyntheticEvent<HTMLButtonElement>) =>
                  deleteEvent(e, eventx.id)
                }
                loading={target === eventx.id && submitting}
              />
            </div>
          </CardActions>
        </Card>
      ))}
      ;
    </Fragment>
  );
};

export default observer(EventList);
