
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const EventListStyles = makeStyles((theme: any) =>
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
    float: 'right',
  },
})
);


export  default EventListStyles;