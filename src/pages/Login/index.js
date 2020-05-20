import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try{
      const response = await api.post('sessions', { email }, { password });
      console.log(response.data.token);
      //localStorage.setItem('token', response.data.token);
      //localStorage.setItem('email', response.data.user.email);
    } catch (err) {
      alert('Falha no Login, tente novamente.');
    }

    history.push('/panel');
  }

  return (
    <div className="login-container">
      <h1>Painel EduLIBRAS</h1>
      <h3>Digite seu e-mail e senha de administrador para acessar o painel.</h3>
      <div className="form">
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="e-mail" 
            value = {email} 
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="senha" 
            value = {password}
            onChange={e => setPassword(e.target.value)}
            required />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}