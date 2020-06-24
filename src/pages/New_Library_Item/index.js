import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import './styles.css'
import { useParams } from 'react-router-dom'

export default function NewLibraryItem({ history }) {
	const youtubeLinkRegex = /(?: https ?: \/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/

	const [loadingState, setLoadingState] = useState(false)

	const [file, setFile] = useState(null)
	const [link, setLink] = useState('')
	const [name, setName] = useState('')
	const [isWrong, setIsWrong] = useState(false)
	const { type } = useParams()

	async function handleSubmit(event) {
		setLoadingState(true)

		event.preventDefault()

		let data = new FormData()

		file ? data.set('file', file) : data.set('file_location', link)
		data.set('name', name)
		data.set('type', type)

		await api.post('/library/new', data)

		history.push('/library/' + type)
	}

	useEffect(() => {
		if (link.match(youtubeLinkRegex) || link === '') {
			setIsWrong(false)
		} else {
			setIsWrong(true)
		}
	}, [link])

	return (
		<>
			<h1 hidden={type !== 'video'}>Biblioteca - Cadastrar Vídeo</h1>
			<h1 hidden={type !== 'book'}>Biblioteca - Cadastrar Livro</h1>
			<h1 hidden={type !== 'music'}>Biblioteca - Cadastrar Música</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='statement'>Nome *</label>
				<input
					id='name'
					placeholder='Nome do conteúdo'
					value={name}
					onChange={(event) => setName(event.target.value)}
					required
				/>

				<label htmlFor='link' hidden={type === 'book'}>
					Link do conteúdo *
				</label>
				<p className='errorMsg' hidden={!isWrong}>
					Insira um link válido para o youtube
				</p>
				<input
					className={isWrong ? 'red' : ''}
					id='link'
					placeholder='Link do Youtube'
					value={link}
					onChange={(event) => setLink(event.target.value)}
					hidden={type === 'book'}
					disabled={type === 'book'}
					required
				/>

				<label htmlFor='file' hidden={type !== 'book'}>
					{' '}
					Arquivo PDF
				</label>
				<input
					type='file'
					onChange={(event) => setFile(event.target.files[0])}
					hidden={type !== 'book'}
					disabled={type !== 'book'}
					required
				/>

				<button
					type='submit'
					className='btn'
					disabled={loadingState || isWrong ? true : false}>
					{loadingState ? 'Cadastrando . . .' : 'Cadastrar'}
				</button>
			</form>
		</>
	)
}
