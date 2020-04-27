import React, { useContext } from 'react';
import { makeStyles,createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import  { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import {format} from 'date-fns';
import { RootStoreContext } from '../../app/store/rootStore';


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
    toolbarMargin: theme.mixins.toolbar,
    
  })
);
const EventCard: React.FC = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const Container = (props: any) => <Grid container {...props} />;
  const Item = (props: any) => <Grid item xs={12} sm={6} md={3} {...props} />;

  const rootStore = useContext(RootStoreContext);
  const {eventsByDate: events, selectEvent} = rootStore.eventStore;

  return (
    
     <Container spacing={3} className={classes.toolbarMargin}>
        {events.map((event) => (
          <Item key={event.id}>
            <Card >
        
             <CardHeader
               avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
        
        title={
          <Button  color="secondary" onClick={() => selectEvent(event.id)}>
         <Link to={`/events/${event.id}`}> {event.title}</Link>  
          </Button>
        }
   
        subheader={format(event.date!, 'eeee do MMMM')}
      />
      <CardMedia
        className={classes.media}
        image={`/assets/categoryImages/${event.category}.jpg`}
        title={event.title}
      />
      <CardContent>
        <Typography variant="subtitle1" component="div">
          {event.venue}; {event.city}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          className={classes.button}
          variant="text"
          color="secondary"
          onClick={() => selectEvent(event.id)}
        >
          <Link to={`/events/${event.id}`}> Free</Link>  
        </Button>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
          </Item>
        ))}
      </Container>
    
  );
};
export default observer(EventCard);
