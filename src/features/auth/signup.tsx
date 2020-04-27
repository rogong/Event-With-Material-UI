import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../app/shared/form/TextInput';
import { RootStoreContext } from '../../app/store/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/shared/form/ErrorMessage';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        NextEvent
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validate = combineValidators({
  email: isRequired('email'),
  username: isRequired('username'),
  displayName: isRequired('displayName'),
  password: isRequired('password'),
});

const SignUp = () => {
  const classes = useStyles();
  //Store
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <FinalForm
          onSubmit={(values: IUserFormValues) =>
            register(values).catch((error) => ({
              [FORM_ERROR]: error,
            }))
          }
          validate={validate}
          render={({
            handleSubmit,
            submitting,
            submitError,
            invalid,
            pristine,
            dirtySinceLastSubmit,
          }) => (
            <Form onSubmit={handleSubmit} error>
              <Field
                name="username"
                component={TextInput}
                placeholder="Username"
              />
              <Field
                name="displayName"
                component={TextInput}
                placeholder="Display Name"
              />

              <Field name="email" component={TextInput} placeholder="Email" />
              <Field
                name="password"
                component={TextInput}
                placeholder="Password"
                type="password"
              />
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage
                  error={submitError}
                  text=''
                />
              )}
              <Button
                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                loading={submitting}
                content="Sign up"
                fluid
                color="blue"
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {'You have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
