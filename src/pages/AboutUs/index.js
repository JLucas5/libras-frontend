import React, { useState } from 'react'
import { useEffect } from 'react'

import api from '../../services/api'

import TextareaAutosize from 'react-textarea-autosize'

import './styles.css'

export default function AboutUs() {
	const stopcicle = true

	const [loadingState, setLoadingState] = useState(false)
	const [aboutUsId, setAboutUsId] = useState('')
	const [aboutUs, setAboutUs] = useState('')

	useEffect(() => {
		async function loadAboutUs() {
			const response = await api.get('/aboutus/')
			console.log(response.data)
			setAboutUs(response.data.text)
			setAboutUsId(response.data._id)
		}

		loadAboutUs()
	}, [stopcicle])

	async function handleSubmit(event) {
		setLoadingState(true)

		event.preventDefault()

		let data = new FormData()

		data.set('text', aboutUs)

		await api.post('/aboutus/edit/' + aboutUsId, data)

		window.location.reload()
	}

	return (
		<>
			<h1>Sobre Nós</h1>
			<form onSubmit={handleSubmit}>
				<TextareaAutosize
					minRows={15}
					className='textarea'
					useCacheForDOMMeasurements
					value={aboutUs}
					onChange={(event) => setAboutUs(event.target.value)}
				/>
				<button
					type='submit'
					className='btn'
					disabled={loadingState ? true : false}>
					{loadingState ? 'Atualizando . . .' : 'Atualizar'}
				</button>
			</form>
		</>
	)
}
