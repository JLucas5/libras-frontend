import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'


export default function NewObjective( { history } ){

    const [ loadingState, setLoadingState] = useState(false)
    
    const [ thumbnail, setThumbnail] = useState(null)
    const [ text, setText ] = useState('')
    const [ correct_answer , setCorrect_answer] = useState(false)
    const [ statement , setStatement] = useState('')
    const [ statement_link , setStatement_link] = useState('')
    const [ activity, setActivity] = useState(null)

    const { id } = useParams()

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null
        },
        [thumbnail]
    )

    async function handleSubmit(event){

        setLoadingState(true)

        event.preventDefault()

        let data = new FormData()

        data.set("thumbnail", thumbnail)
        data.set("text", text)
        data.set("question_type", "obj")
        data.set("correct_answer", correct_answer)
        
        await api.post('/activities/update/' + id, data)

        window.location.reload()
    }


    return (

        <>
            <Row><h1>Editar Atividade</h1></Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Row>
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
                                value = {statement_link}
                                onChange = {event => setStatement_link(event.target.value)}
                            />

                            <Form.Label
                            id="thumbnail" 
                            style={{backgroundImage: `url(${preview})`}}
                            className= {thumbnail ? 'has-thumbnail' : ''}
                            >
                            <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                            <img src={camera} alt="Select img"/>
                            </Form.Label>
                        </Row>
                        <button type ='submit' className="btn" disabled= { loadingState ? true : false } >
                            { loadingState ? "Salvando . . ."  : "Salvar" }
                        </button>
                    </Col>
                    <Col>
                        <Row><h2 style={ { 'margin-left': '10%'} }>Alternativas</h2></Row>
                        <Row>
                            <ul>
                            {activity.alternatives.map(alternative => (
                                <li key={alternative._id}>
                                    <strong>{alternative.text}</strong>
                                    <span>{alternative.location}</span>
                                </li>
                            ))}
                            </ul>
                        </Row>
                    </Col>
                </Row>
            </Form>

            <form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                    type="checkbox" label="Resposta Correta?"
                    value={correct_answer}
                    onChange = {event => setCorrect_answer(!correct_answer) }/>
                </Form.Group>
            </form>
        </>
    )
}