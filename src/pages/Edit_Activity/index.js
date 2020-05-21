import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'
import { useEffect } from 'react'

export default function EditActivity({ history }) {
	const [loadingState, setLoadingState] = useState(false)
	const [newAltModal, setNewAltModal] = useState(false)
	const [editAltModal, setEditAltModal] = useState(false)

	const [activity, setActivity] = useState({})

	const [thumbnail, setThumbnail] = useState(null)
	const [video, setVideo] = useState('')
	const [pdf, setPdf] = useState(null)
	const [expected_answer, setExpected_answer] = useState('')
	const [statement, setStatement] = useState('')
	const [alternatives, setAlternatives] = useState([])

	const [correct_answer, setCorrect_answer] = useState(false)
	const [alternative_text, setAlternative_text] = useState('')
	const [alternative_video, setAlternative_video] = useState('')
	const [alternative_thumbnail, setAlternative_thumbnail] = useState(null)

	const [alternative_edit, setAlternative_edit] = useState('')
	const [alternative_video_edit, setAlternative_video_edit] = useState('')
	const [correct_answer_edit, setCorrect_answer_edit] = useState(false)
	const [alternative_text_edit, setAlternative_text_edit] = useState('')

	const [
		alternative_thumbnail_edit,
		setAlternative_thumbnail_edit,
	] = useState(null)

	const { id: activity_id } = useParams()

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null
	}, [thumbnail])

	const alternative_preview = useMemo(() => {
		return alternative_thumbnail
			? URL.createObjectURL(alternative_thumbnail)
			: null
	}, [alternative_thumbnail])

	useEffect(() => {
		async function loadModule() {
			let response = await api.get('/activities/' + activity_id)

			setActivity(response.data)
			setVideo(response.data.video)
			setStatement(response.data.statement)
			setExpected_answer(response.data.expected_answer)

			response = await api.get('/alternative/find/' + activity_id)

			setAlternatives(response.data)
		}

		loadModule()
	}, [activity_id])

	async function handleSubmit(event) {
		setLoadingState(true)

		event.preventDefault()

		let data = new FormData()

		data.set('statement', statement)
		data.set('thumbnail', thumbnail)
		data.set('video', video)
		data.set('pdf', pdf)
		data.set('expected_answer', expected_answer)

		await api.post('/activities/update/' + activity_id, data)

		window.location.reload()
	}

	async function handleSave(event) {
		setLoadingState(true)

		event.preventDefault()

		let data = new FormData()

		data.set('correct_answer', correct_answer)
		data.set('thumbnail', alternative_thumbnail)
		data.set('text', alternative_text)
		data.set('video', alternative_video)

		await api.post('/alternative/add/' + activity_id, data)

		window.location.reload()
	}

	async function deleteAlternative(alternative_id) {
		await api.delete('/alternative/delete/' + alternative_id)

		window.location.reload()
	}

	async function handleEdit(alternative_id) {
		let data = new FormData()

		data.set('correct_answer', correct_answer_edit)
		data.set('thumbnail', alternative_thumbnail_edit)
		data.set('text', alternative_text_edit)
		data.set('video', alternative_video_edit)

		await api.post('/alternative/edit/' + alternative_id, data)

		console.log('oiii')
		window.location.reload()
	}

	function editAlternative(alternative) {
		setAlternative_text_edit(alternative.text)
		setAlternative_thumbnail_edit(alternative.thumbnail)
		setCorrect_answer_edit(alternative.correct_answer)
		setAlternative_edit(alternative._id)
		setAlternative_video_edit(alternative.video)

		handleShowEdit()
	}

	const handleShowNew = () => setNewAltModal(true)
	const handleCloseNew = () => setNewAltModal(false)

	const handleShowEdit = () => setEditAltModal(true)
	const handleCloseEdit = () => setEditAltModal(false)

	return (
		<>
			<Row>
				<h1>Editar Atividade</h1>
			</Row>
			<Row>
				<Col>
					<Row>
						<Col>
							<Form.Label>Enunciado em Português: *</Form.Label>
							<Form.Control
								id='statement'
								placeholder='Qual, por que, como . . .'
								value={statement}
								onChange={(event) =>
									setStatement(event.target.value)
								}
							/>

							<Form.Label>Enunciado em LIBRAS (vídeo)</Form.Label>
							<Form.Control
								id='stetement_link'
								placeholder='Link para o Youtube aqui'
								value={video}
								onChange={(event) =>
									setVideo(event.target.value)
								}
							/>

							<label htmlFor='file'>Arquivo PDF</label>
							<a
								id='btn'
								className='btn'
								href={activity.pdf}
								target='_blank'
								rel='noopener noreferrer'
								hidden={!activity.pdf}>
								Ver arquivo antigo
							</a>
							<input
								type='file'
								onChange={(event) =>
									setPdf(event.target.files[0])
								}
							/>

							<Form.Label
								className='thumbnail'
								style={{
									backgroundImage: preview
										? `url(${preview})`
										: `url(${activity.statement_image})`,
								}}>
								<input
									type='file'
									onChange={(event) =>
										setThumbnail(event.target.files[0])
									}
								/>
								<img src={camera} alt='Select img' />
							</Form.Label>

							<Form.Label hidden={activity.type === 'obj'}>
								Resposta Esperada
							</Form.Label>
							<Form.Control
								hidden={activity.type === 'obj'}
								id='expected_answer'
								placeholder='Resposta correta esperada aqui'
								value={expected_answer}
								onChange={(event) =>
									setExpected_answer(event.target.value)
								}
							/>
						</Col>
					</Row>
					<button
						className='btn'
						onClick={(event) => handleSubmit(event)}
						disabled={loadingState ? true : false}>
						{loadingState ? 'Salvando . . .' : 'Salvar'}
					</button>
				</Col>
				<Col hidden={activity.type === 'sub'}>
					<Row>
						<h2 style={{ 'margin-left': '10%' }}>Alternativas</h2>
					</Row>
					<Row>
						<Col>
							{alternatives ? (
								alternatives.map((alternative) => (
									<Row
										key={alternative._id}
										id={
											alternative.correct_answer
												? 'correct_answer'
												: ''
										}
										className='alternative'>
										<Col md={1}>
											<input
												onClick={(event) =>
													setExpected_answer(
														event.target.value
													)
												}
												type='radio'
												name='correctAlternative'
												value={alternative._id}
												id=''
												checked={
													alternative._id ===
													expected_answer
												}
											/>
										</Col>
										<Col md={5}>
											<strong>{alternative.text}</strong>
											<label
												hidden={
													alternative.location
														? false
														: true
												}
												className='alternative-thumbnail'
												style={{
													backgroundImage: `url(${alternative.location})`,
												}}></label>
										</Col>
										<Col md={3}>
											<button
												id='editar'
												onClick={(event) =>
													editAlternative(alternative)
												}>
												Editar
											</button>
										</Col>
										<Col md={3}>
											<button
												id='excluir'
												onClick={(event) =>
													deleteAlternative(
														alternative._id
													)
												}>
												Deletar
											</button>
										</Col>
									</Row>
								))
							) : (
								<></>
							)}
						</Col>
					</Row>
					<Row>
						<Col>
							<button onClick={handleShowNew}>
								Adicionar alternativa
							</button>
						</Col>
					</Row>
				</Col>
			</Row>

			{/* New alternative modal */}
			<Modal show={newAltModal} onHide={handleCloseNew}>
				<Modal.Header>
					<Modal.Title>Nova Alternativa</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Label>Texto da Alternativa</Form.Label>
					<Form.Control
						id='statement'
						placeholder='Texto aqui'
						value={alternative_text}
						onChange={(event) =>
							setAlternative_text(event.target.value)
						}
					/>
					<Form.Label>Video da Alternativa</Form.Label>
					<Form.Control
						id='video'
						placeholder='Link aqui'
						value={alternative_video}
						onChange={(event) =>
							setAlternative_video(event.target.value)
						}
					/>
					<Form.Label
						className='thumbnail'
						style={{
							backgroundImage: `url(${alternative_preview})`,
						}}>
						<input
							type='file'
							onChange={(event) =>
								setAlternative_thumbnail(event.target.files[0])
							}
						/>
						<img src={camera} alt='Select img' />
					</Form.Label>

					<Form.Check
						label='Alternativa correta?'
						onChange={(event) => {
							setCorrect_answer(!correct_answer)
						}}
						id='checkbox'
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseNew}>
						Fechar
					</Button>
					<Button
						variant='primary'
						onClick={handleSave}
						disabled={loadingState ? true : false}>
						{loadingState ? 'Salvando . . .' : 'Salvar'}
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Edit alternative modal */}
			<Modal show={editAltModal} onHide={handleCloseEdit}>
				<Modal.Header>
					<Modal.Title>Editar Alternativa</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Label>Texto da Alternativa</Form.Label>
					<Form.Control
						id='statement'
						placeholder='Texto aqui'
						value={alternative_text_edit}
						onChange={(event) =>
							setAlternative_text_edit(event.target.value)
						}
					/>
					<Form.Label>Vídeo da Alternativa</Form.Label>
					<Form.Control
						id='video'
						placeholder='Link aqui'
						value={alternative_video_edit}
						onChange={(event) =>
							setAlternative_video_edit(event.target.value)
						}
					/>

					<Form.Label
						className='thumbnail'
						style={{
							backgroundImage: `url(${alternative_thumbnail_edit})`,
						}}>
						<input
							type='file'
							onChange={(event) =>
								setAlternative_thumbnail_edit(
									event.target.files[0]
								)
							}
						/>
						<img src={camera} alt='Select img' />
					</Form.Label>
				</Modal.Body>

				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseEdit}>
						Fechar
					</Button>
					<Button
						variant='primary'
						onClick={(event) => {
							handleEdit(alternative_edit)
						}}
						disabled={loadingState ? true : false}>
						{loadingState ? 'Salvando . . .' : 'Salvar'}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
