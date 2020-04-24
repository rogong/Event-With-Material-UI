
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const eventDetailStyles = makeStyles((theme: any) =>
createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
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
  },
})
);

export default eventDetailStyles;