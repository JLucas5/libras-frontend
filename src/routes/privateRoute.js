//Verifica se o usuário está autenticado
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

export const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route 
    {...rest} 
    render={props => 
      isAuthenticated() ? (
        <Component {...props} /> // se o usuário estiver logado
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location}}} />
      )
    }
  />
);