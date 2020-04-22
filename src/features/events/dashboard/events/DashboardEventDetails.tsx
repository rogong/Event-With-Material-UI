import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { IEvent } from '../../../../app/models/activity';

interface IProps {
  event: IEvent;
  setEditMode: (editMode: boolean) => void;
  setSelectedEvent: (event: IEvent | null) => void;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    card: {
      maxWidth: 400,
    },
    content: {
      marginTop: theme.spacing(1),
    },
    root: {
      maxWidth: 345,
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
    margin: {
      margin: theme.spacing(1),
    },
    red: {
      backgroundColor: red[900],
    }
  })
);
const DashboardEventDetails: React.FC<IProps> = ({
  event,
  setEditMode,
  setSelectedEvent,
}) => {
  const classes = useStyles();
  return (
    <Card style={{ marginBottom: '5em' }}>
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
        title={<Button color="secondary">{event.title}</Button>}
        subheader={<Button color="secondary">{event.date}</Button>}
      />
      <CardMedia
        className={classes.media}
        image={`/assets/categoryImages/${event.category}.jpg`}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {event.description}
        </Typography>

        <Typography variant="subtitle1" component="div">
          {event.venue}, {event.city}
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

      
        <IconButton 
        aria-label="delete" 
        color="secondary" 
            className={classes.margin}
            onClick={() => setEditMode(true)}
             >
              <EditIcon fontSize="small" />
       </IconButton>

        <Button
          className={classes.button}
          variant="outlined"
          color="default"
          onClick={() => setSelectedEvent(null)}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};
export default DashboardEventDetails;
