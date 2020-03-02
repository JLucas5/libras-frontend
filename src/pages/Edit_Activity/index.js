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


export default function EditActivity( { history } ){

    const [ loadingState, setLoadingState] = useState(false)
    const [ show, setShow ] = useState(false)

    const [ activity, setActivity] = useState({})

    const [ thumbnail, setThumbnail ] = useState(null)
    const [ video, setVideo ] = useState("")
    const [ expected_answer, setExpected_answer ] = useState("")
    const [ statement , setStatement ] = useState('')
    const [ alternatives, setAlternatives ] = useState([])
    
    const [ correct_answer , setCorrect_answer ] = useState(false)
    const [ alternative_text, setAlternative_text ] = useState("")
    const [ alternative_thumbnail, setAlternative_thumbnail] = useState(null)
    
    const { id: activity_id } = useParams()

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null
        },
        [thumbnail]
    )

    const alternative_preview = useMemo(
        () => {
            return alternative_thumbnail ? URL.createObjectURL(alternative_thumbnail) : null
        },
        [alternative_thumbnail]
    )

    useEffect(()=> {
        async function loadModule(){

            let response = await api.get('/activities/' + activity_id)

            setActivity(response.data)
            setVideo(response.data.video)
            setStatement(response.data.statement)
            setExpected_answer(response.data.expected_answer)

            response = await api.get('/alternative/find/' + activity_id)

            setAlternatives(response.data)
        }

        loadModule()
    }, [activity_id] )

    async function handleSubmit(event){

        setLoadingState(true)

        event.preventDefault()

        let data = new FormData()

        data.set("statement", statement)
        data.set("thumbnail", thumbnail)
        data.set("video", video)
        data.set("expected_answer", expected_answer)

        await api.post('/activities/update/' + activity_id, data)

        window.location.reload()
    }

    async function handleSave(event){

        setLoadingState(true)

        event.preventDefault()

        let data = new FormData()

        data.set('correct_answer', correct_answer)
        data.set('thumbnail', alternative_thumbnail)
        data.set('text', alternative_text)

        await api.post('/alternative/add/' + activity_id, data)

        window.location.reload()
    }

    async function deleteAlternative(alternative_id){
        
        await api.delete('/alternative/delete/' + alternative_id)

        window.location.reload()

    }
    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    return (

        <>
            <Row><h1>Editar Atividade</h1></Row>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Form.Label>Enunciado em Português: *</Form.Label>
                                <Form.Control
                                    id="statement"
                                    placeholder="Qual, por que, como . . ."
                                    value={statement}
                                    onChange={event => setStatement(event.target.value)}
                                    />

                                <Form.Label>Enunciado em LIBRAS (vídeo)</Form.Label>
                                <Form.Control
                                    id="stetement_link"
                                    placeholder="Link para o Youtube aqui"
                                    value = {video}
                                    onChange = {event => setVideo(event.target.value)}
                                />
                                <Form.Label
                                className="thumbnail"
                                style={{backgroundImage: preview ? `url(${preview})` : `url(${activity.statement_image})` }}
                                >
                                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                                <img src={camera} alt="Select img"/>
                                </Form.Label>

                                <Form.Label hidden={activity.type === "obj"}>Resposta Esperada</Form.Label>
                                <Form.Control
                                    hidden={activity.type === "obj"}
                                    id="expected_answer"
                                    placeholder="Resposta correta esperada aqui"
                                    value = {expected_answer}
                                    onChange = {event => setExpected_answer(event.target.value)}
                                />
                            </Col>
                        </Row>
                        <button className="btn" onClick={event => handleSubmit(event)} disabled= { loadingState ? true : false } >
                            { loadingState ? "Salvando . . ."  : "Salvar" }
                        </button>
                    </Col>
                    <Col hidden={activity.type === "sub"}>
                        <Row><h2 style={ { 'margin-left': '10%'} }>Alternativas</h2></Row>
                        <Row>
                            <Col>
                            {alternatives ? alternatives.map(alternative => (
                                <Row key={alternative._id}>
                                    <Col md={9}>
                                        <strong>{alternative.text}</strong>
                                        <label disabled={alternative.location ? true : false}
                                            className="alternative-thumbnail"
                                            style={{backgroundImage: `url(${alternative.location})`}}
                                        >
                                        </label>
                                    </Col>
                                    <Col md={3}>
                                        <button id="excluir" onClick={event => deleteAlternative(alternative._id)}>Deletar</button>
                                    </Col>
                                </Row>
                            )) : <></>}
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <button onClick={handleShow}>Adicionar alternativa</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Nova Alternativa</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Texto da Alternativa</Form.Label>
                        <Form.Control
                            id="statement"
                            placeholder="Texto aqui"
                            value={alternative_text}
                            onChange={event => setAlternative_text(event.target.value)}
                        />
                        <Form.Label
                            className="thumbnail"
                            style={{backgroundImage: `url(${alternative_preview})`}}
                        >
                            <input type="file" onChange={event => setAlternative_thumbnail(event.target.files[0])} />
                            <img src={camera} alt="Select img"/>
                        </Form.Label>
                        <Form.Check
                        label="Alternativa correta?"
                        onChange={event => { setCorrect_answer(!correct_answer) }}
                        id="checkbox"
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="primary" onClick={handleSave} disabled= { loadingState ? true : false }>
                            { loadingState ? "Salvando . . ."  : "Salvar" }
                        </Button>
                    </Modal.Footer>
            </Modal>                    

            
        </>
    )
}