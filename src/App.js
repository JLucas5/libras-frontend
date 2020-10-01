import React, { useContext } from 'react'
import './App.css'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarSuperior from './components/NavBarSuperior'

export default function App() {

	const user = React.createContext();

	return (
		<>		
			<NavBarSuperior />
			<div className='container'>
				<div className='content'>
					<Routes />
				</div>
			</div>
		</>
	)	
}
