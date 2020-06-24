import React, { useContext } from "react"
import "./App.css"
import Routes from "./routes"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "react-bootstrap/Navbar"
import app from "./base"
import Nav from "react-bootstrap/Nav"
import { NavDropdown } from "react-bootstrap"

function App() {
	return (
		<div>
			<Navbar sticky="top" collapseOnSelect expand="lg">
				<Navbar.Brand href="/home">Painel EduLibras</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav.Link href="/module">Módulos</Nav.Link>
					<Nav.Link href="/dictionary">Dicionário</Nav.Link>
					<NavDropdown title="Biblioteca">
						<NavDropdown.Item href="/library/video">
							Videos
						</NavDropdown.Item>
						<NavDropdown.Item href="/library/music">
							Músicas
						</NavDropdown.Item>
						<NavDropdown.Item href="/library/book">
							Livros
						</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link href="/aboutus">Sobre nós</Nav.Link>
					<Nav.Link
						className="exit-button"
						onClick={() => {
							app.auth().signOut()
						}}>
						Sair
					</Nav.Link>
				</Navbar.Collapse>
			</Navbar>

			<div className="container">
				<div className="content">
					<Routes />
				</div>
			</div>
		</div>
	)
}

export default App
