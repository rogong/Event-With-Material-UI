import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/dashboard/events/EventDashboard';


const App = () => {

  return (
    <div>
    
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/events" component={EventDashboard} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
