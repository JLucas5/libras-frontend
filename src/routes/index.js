import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import{ PrivateRoute } from './privateRoute.js';

import Login from '../pages/Login';
import Panel from '../pages/Panel';

export default function Routes(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Login} />
          <PrivateRoute path='/panel' component={Panel} />
        </Switch>
      </BrowserRouter>

    )
}