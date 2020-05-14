//Verifica se o usuário está autenticado
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from "../services/auth";

export const PrivateRoute = ({ component: RouteComponent, ...rest}) => {
  const {currentUser} = useContext(AuthContext);
  return (
    
    <Route 
      {...rest} 
      render={routeprops => 
        !!currentUser ? (
          <RouteComponent {...routeprops} /> //se tiver usuário logado
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};