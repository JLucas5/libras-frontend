import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

export default function EditAboutUs() {
	const stopcicle = true

	const [aboutUs, setAboutUs] = useState([])

	useEffect(() => {
		async function loadAboutUs() {
			const response = await api.get('/aboutus/')
			console.log(response.data)
			setAboutUs(response.data)
		}

		loadAboutUs()
	}, [stopcicle])

	async function deleteItem(id) {
		await api.delete('/aboutus/delete/' + id)

		window.location.reload()
	}

	return (
		<>
			<h1>Sobre Nós</h1>
			<Link to={'/aboutus/new'}>
				<button className='btn'>Cadastrar novo item</button>
			</Link>
			<ul className='aboutus-list' id='aboutus'>
				{aboutUs.map((aboutus_item) => (
					<li key={aboutus_item._id}>
						<strong>{aboutus_item.title}</strong>
						<p>
							<Link to={'/aboutus/edit/' + aboutus_item._id}>
								<button className='btn' id='editar'>
									editar
								</button>
							</Link>
							<button
								className='btn'
								id='excluir'
								onClick={(event) =>
									deleteItem(aboutus_item._id)
								}>
								excluir
							</button>
						</p>
					</li>
				))}
			</ul>
		</>
	)
}
