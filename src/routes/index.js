import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthProvider } from "../services/auth";
import{ PrivateRoute } from './privateRoute.js';

import Login from '../pages/Login';
import Panel from '../pages/Panel';

export default function Routes(){
    return (
      <AuthProvider>
          <Switch>
              <Route path='/' exact component={Login} />
              <PrivateRoute path='/panel'component={Panel}/>
          </Switch>
      </AuthProvider>
    )
}