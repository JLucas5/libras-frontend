import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap'
import app from '../base'
import logo from '../assets/logo.png'

function UsuarioEstaLogado() {
	return (
		<Nav.Link
			className="exit-button"
			onClick={() => {
				app.auth().signOut()
			}}>
			Sair
		</Nav.Link>
	);
}

export default class NavBarSuperior extends React.Component {
	render() {
		return (
			<div>
				<Navbar sticky='top' collapseOnSelect expand='lg'>
					<Navbar.Brand href='/home'><img src={logo} alt="Painel EduLibras" width='160px' height='100px' /></Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav.Link href='/module'>Módulos</Nav.Link>
						<Nav.Link href='/dictionary'>Dicionário</Nav.Link>
						<NavDropdown title='Biblioteca'>
							<NavDropdown.Item href='/library/video'>
								Videos
							</NavDropdown.Item>
							<NavDropdown.Item href='/library/music'>
								Músicas
							</NavDropdown.Item>
							<NavDropdown.Item href='/library/book'>
								Livros
							</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link href='/aboutus'>Sobre nós</Nav.Link>
						<UsuarioEstaLogado />
					</Navbar.Collapse>
				</Navbar>
			</div>
		)
	}
}