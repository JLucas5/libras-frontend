import React, { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'

export default function EditDictionaryItem({ history }) {
	const { id } = useParams()

	const [loadingState, setLoadingState] = useState(false)

	const [previous_image, setPrevious_image] = useState('')

	const [thumbnail, setThumbnail] = useState(null)
	const [word, setWord] = useState('')
	const [meaning, setMeaning] = useState('')
	const [video, setVideo] = useState('')

	useEffect(() => {
		async function loadActivities() {
			const response = await api.get('/dictionary/' + id)

			setPrevious_image(response.data.location)
			setWord(response.data.word)
			setVideo(response.data.video)
		}

		loadActivities()
	}, [id])

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null
	}, [thumbnail])

	async function handleSubmit(event) {
		setLoadingState(true)

		event.preventDefault()

		let data = new FormData()

		data.set('thumbnail', thumbnail)
		data.set('word', word)
		data.set('video', video)

		data.set('old_image', previous_image)

		await api.post('/dictionary/edit/' + id, data)

		history.push('/dictionary/')
	}

	return (
		<form onSubmit={handleSubmit}>
			<label
				id='thumbnail'
				style={{
					backgroundImage: thumbnail
						? `url(${preview})`
						: `url(${previous_image})`,
				}}
				className={''}>
				<input
					type='file'
					onChange={(event) => setThumbnail(event.target.files[0])}
				/>
				<img src={camera} alt='Select img' />
			</label>

			<label htmlFor='statement'>Vídeo</label>
			<input
				id='video'
				placeholder='Link do youtube da palavra em LIBRAS'
				value={video}
				onChange={(event) => setVideo(event.target.value)}
			/>

			<label htmlFor='statement'>Palavra *</label>
			<input
				id='word'
				placeholder='A palavra em português'
				value={word}
				onChange={(event) => setWord(event.target.value)}
			/>
			<label htmlFor='meaning'>Significado</label>
			<input
				id='meaning'
				placeholder='O significado em português'
				value={meaning}
				onChange={(event) => setMeaning(event.target.value)}
			/>

			<button
				type='submit'
				className='btn'
				disabled={loadingState ? true : false}>
				{loadingState ? 'Atualizando . . .' : 'Atualizar'}
			</button>
		</form>
	)
}
