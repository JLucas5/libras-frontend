import React from 'react'
import './App.css'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function App() {
  return (
    <div>
      <Navbar sticky="top" collapseOnSelect expand="lg">
        <Navbar.Brand href="/home">Painel EduLIBRAS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav.Link href="/module">Módulos</Nav.Link>
            <Nav.Link href="/library">Biblioteca</Nav.Link>
            <Nav.Link href="/dictionary">Dicionário</Nav.Link>
        </Navbar.Collapse>
      </Navbar>

      <div className="container"> 
        <div className="content">
          <Routes />
        </div>
      </div>
    </div>
    );
}

export default App
