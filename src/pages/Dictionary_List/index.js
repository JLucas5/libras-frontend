import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

export default function DictionaryList() {
	const [dictionary, setDictionary] = useState([])

	async function deleteItem(id) {
		await api.delete('/dictionary/delete/' + id)

		window.location.reload()
	}

	useEffect(() => {
		async function loadActivities() {
			const response = await api.get('/dictionary')

			setDictionary(response.data)
		}

		loadActivities()
	}, [])

	return (
		<>
			<h1>DICIONÁRIO</h1>
			<Link to={'/dictionary/new'}>
				<button className='btn'>Cadastrar novo item</button>
			</Link>
			<ul className='dictionary-list' id='dictionary'>
				{dictionary.map((dictionary_item) => (
					<li key={dictionary_item._id}>
						<strong>{dictionary_item.word}</strong>
						<p>
							<Link
								to={'/dictionary/edit/' + dictionary_item._id}>
								<button className='btn' id='editar'>
									editar
								</button>
							</Link>
							<button
								className='btn'
								id='excluir'
								onClick={(event) =>
									deleteItem(dictionary_item._id)
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
