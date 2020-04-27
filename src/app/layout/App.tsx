import React, { useContext, useEffect } from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/dashboard/events/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import EventForm from '../../features/events/form/EventForm';
import { observer } from 'mobx-react-lite';
import LoadingComponentLinear from './LoadingComponentLinear';
import { SignIn } from '../../features/auth/signin';
import EventDetails  from '../../features/events/details/EventDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import { RootStoreContext } from '../store/rootStore';
import ModalContainer from '../shared/modals/ModalContainer';
import SignUp from '../../features/auth/signup';



const App: React.FC<RouteComponentProps> = ({location}) => {
 //Store
 const rootStore = useContext(RootStoreContext);

 const {loadEvents,loadingInitial } = rootStore.eventStore;
 const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
 const {getUser} = rootStore.userStore;

 useEffect(() => {
  loadEvents();
}, [loadEvents]);

useEffect (() => {
  if(token) {
    getUser().finally(() => setAppLoaded())
  }else {
    setAppLoaded()
  }
}, [getUser, setAppLoaded, token])

 if(!appLoaded) return <LoadingComponentLinear />;
  return (
    <div>
        <ModalContainer/>
     <ToastContainer position='top-right' /> 
   
    <NavBar />  
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/events" component={EventDashboard} />
        <Route path="/events/:id" component={EventDetails} />
        <Route key={location.key}  path={['/create', '/manage/:id']} component={EventForm} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default withRouter(observer(App));
