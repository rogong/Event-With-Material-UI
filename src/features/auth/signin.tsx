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
import {Form as FinalForm, Field } from 'react-final-form';
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
  password: isRequired('password')
})

export const SignIn = () => {
  const classes = useStyles();
  //Store 
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FinalForm
        onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
          [FORM_ERROR]: error
        }))}
        validate={validate}
        render={({ handleSubmit, submitting, form, submitError, invalid, pristine,dirtySinceLastSubmit }) => (
          <Form onSubmit={handleSubmit} error>
            <Field name='email' component={TextInput} placeholder='Email' />
            <Field name='password' component={TextInput}  placeholder='Password' type='password'/>
           {submitError && !dirtySinceLastSubmit && (
             <ErrorMessage
             error={submitError}
             text='Invalid email or password'
             />
           )}
              <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
           
            content="Sign in"
            fluid
            color='blue'
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
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
