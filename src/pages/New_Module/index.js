import React, { useState, useMemo, useEffect } from 'react'

import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'

export default function NewModule({ history }) {
	const youtubeLinkRegex = /(?: https ?: \/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/

	const [loadingState, setLoadingState] = useState(false)

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState(null)
	const [file, setFile] = useState(null)
	const [link, setLink] = useState('')
	const [isWrong, setIsWrong] = useState(false)

	const preview = useMemo(() => {
		return image ? URL.createObjectURL(image) : null
	}, [image])

	async function handleSubmit(event) {
		setLoadingState(true)

		event.preventDefault()

		let data = new FormData()

		data.set('name', name)
		data.set('description', description)
		data.set('thumbnail', image)
		data.set('pdf', file)
		data.set('video', link)

		await api.post('/modules/new', data)

		history.push('/module')
	}
	useEffect(() => {
		if (link.match(youtubeLinkRegex) || link === '') {
			setIsWrong(false)
		} else {
			setIsWrong(true)
		}
	}, [link])

	return (
		<form onSubmit={handleSubmit}>
			<h1>Novo Módulo</h1>

			<label htmlFor='name'>TÍTULO</label>
			<input
				id='name'
				placeholder='O nome do seu módulo'
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>

			<label htmlFor='description'>DESCRIÇÃO</label>
			<input
				id='description'
				placeholder='Descrição do módulo'
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>

			<label htmlFor='description'>VÍDEO</label>
			<p className='errorMsg' hidden={!isWrong}>
				Insira um link válido para o youtube
			</p>
			<input
				className={isWrong ? 'red' : ''}
				placeholder='Link do vídeo'
				value={link}
				onChange={(event) => setLink(event.target.value)}
			/>

			<p>IMAGEM </p>
			<label
				id='thumbnail'
				style={{ backgroundImage: `url(${preview})` }}
				className={image ? 'has-thumbnail' : ''}>
				<input
					type='file'
					onChange={(event) => setImage(event.target.files[0])}
				/>
				<img src={camera} alt='Select img' />
			</label>

			<label htmlFor='file'>Arquivo PDF</label>
			<input
				type='file'
				onChange={(event) => setFile(event.target.files[0])}
			/>

			<button
				type='submit'
				className='btn'
				disabled={loadingState || isWrong ? true : false}>
				{loadingState ? 'Cadastrando . . .' : 'Cadastrar'}
			</button>
		</form>
	)
}
