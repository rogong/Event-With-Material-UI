import React, { useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react-lite';
import eventDetailStyles from './styles/eventDetailStyles';
import { RouteComponentProps, Link } from 'react-router-dom';
import { RootStoreContext } from '../../../../app/store/rootStore';


interface DetailParams {
  id: string
}

const DashboardEventDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

  //Open Store .................................
  const classes = eventDetailStyles();
  const rootStore = useContext(RootStoreContext);

  const {loadEvent,event} = rootStore.eventStore;
 
  //Close Store .................................
  useEffect(() => {
    loadEvent(match.params.id)
  }, [loadEvent,match.params.id])
  


  return (
    <Card style={{ marginTop: '5em' }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Button color="secondary">{event!.title}</Button>}
        subheader={<Button color="secondary">{event!.date}</Button>}
      />
      <CardMedia
        className={classes.media}
        image={`/assets/categoryImages/${event!.category}.jpg`}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {event!.description}
        </Typography>

        <Typography variant="subtitle1" component="div">
          {event!.venue}, {event!.city}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          className={classes.button}
          variant="contained"
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

        <Link to={`/manage/${event!.id}`}>
        <IconButton 
          aria-label="delete"
          color="secondary"
          className={classes.margin}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        </Link>

        <Button
          className={classes.button}
          variant="outlined"
          color="default"
          onClick={() => history.push('/events')}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};
export default observer(DashboardEventDetails);
