import React, { useContext, useEffect } from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/dashboard/events/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import DashboardEventDetails from '../../features/events/dashboard/events/DashboardEventDetails';
import EventForm from '../../features/events/form/EventForm';
import { observer } from 'mobx-react-lite';
import EventStore from '../store/eventStore';
import LoadingComponentLinear from './LoadingComponentLinear';
import { SignIn } from '../../features/auth/signin';


const App: React.FC<RouteComponentProps> = ({location}) => {
 //Store
 const eventStore = useContext(EventStore);
 const {loadingInitial } = eventStore;

 useEffect(() => {
  eventStore.loadEvents();
}, [eventStore]);

 if(loadingInitial) return <LoadingComponentLinear />;
  return (
    <div>
      <Route path='/signin' component={SignIn} />
    <NavBar />  
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/events" component={EventDashboard} />
        <Route path="/events/:id" component={DashboardEventDetails} />
        <Route key={location.key}  path={['/create', '/manage/:id']} component={EventForm} />
      </Switch>
    </div>
  );
};

export default withRouter(observer(App));
