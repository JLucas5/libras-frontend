import React, { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import app from '../../services/base';
import { AuthContext } from '../../services/auth';
import './styles.css';

export const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const {email, password} = event.target.elements;
      const emailAdmin = "teste-auth@gmail.com ";
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        if(email.value === emailAdmin) {
          history.push("/panel");
        }
      } catch(error) {
        alert(error);
      }
    },
    [history]
  );
    
    const { currentUser } = useContext(AuthContext);

    if(currentUser) {
      return history.push("/panel");
    }

  return (
    <div class="login-container">
      <h1>Painel EduLIBRAS</h1>
      <h3>Digite seu e-mail e senha de administrador para acessar o painel.</h3>
      <div class="form">
        <form onSubmit={handleLogin}>
          <input name="email" type="email" placeholder="e-mail"/>
          <input name="password" type="password" placeholder="senha"/>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);