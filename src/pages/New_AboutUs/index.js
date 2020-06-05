import React, { useState } from 'react'

import api from '../../services/api'

import TextareaAutosize from 'react-textarea-autosize'

import './styles.css'

export default function NewAboutUs({ history }) {
	const [loadingState, setLoadingState] = useState(false)

	const [title, setTitle] = useState('')
	const [link, setLink] = useState('')
	const [priority, setPriority] = useState(0)
	const [text, setText] = useState('')

	async function handleSubmit(event) {
		setLoadingState(true)

		event.preventDefault()

		let data = new FormData()

		data.set('title', title)
		data.set('link', link)
		data.set('text', text)
		data.set('priority', priority)

		await api.post('/aboutus/create', data)

		history.push('/aboutus')
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='title'>Título *</label>
			<input
				id='title'
				placeholder='Título'
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<label htmlFor='statement'>Conteúdo</label>
			<TextareaAutosize
				minRows={5}
				maxRows={6}
				className='textarea'
				useCacheForDOMMeasurements
				value={text}
				onChange={(event) => setText(event.target.value)}
			/>
			<label htmlFor='link'>Link</label>
			<input
				id='link'
				placeholder='Link do youtube'
				value={link}
				onChange={(event) => setLink(event.target.value)}
			/>
			<label for='priority'>Prioridade (0-100):</label>
			<input
				type='number'
				id='priority'
				name='priority'
				min='0'
				max='100'
				value={priority}></input>
			<button
				type='submit'
				className='btn'
				disabled={loadingState ? true : false}>
				{loadingState ? 'Cadastrando . . .' : 'Cadastrar'}
			</button>
		</form>
	)
}
