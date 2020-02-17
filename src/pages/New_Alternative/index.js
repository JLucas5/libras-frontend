import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'


import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'


export default function NewObjective( { history } ){

    const [ loadingState, setLoadingState] = useState(false)
    
    const [ thumbnail, setThumbnail] = useState(null)
    const [ text, setText ] = useState('')
    const [ correct_answer , setCorrect_answer] = useState(false)

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
        <form onSubmit={handleSubmit}>
            <label 
            id="thumbnail" 
            style={{backgroundImage: `url(${preview})`}}
            className= {thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />       
                <img src={camera} alt="Select img"/>

            </label>
            
            <label htmlFor="statement">TEXTO DA ALTERNATIVA</label>
            <input id='enunciado'
            placeholder='Deixe em branco se não existir'
            value={text}
            onChange = {event => setText(event.target.value)}
            />

            <Form.Group controlId="formBasicCheckbox">
                <Form.Check 
                type="checkbox" label="Resposta Correta?"
                value={correct_answer}
                onChange = {event => {
                    setCorrect_answer(!correct_answer)
                    }}/>
            </Form.Group>

            <button type ='submit' className="btn" disabled= { loadingState ? true : false } >
                { loadingState ? "Cadastrando . . ."  : "Cadastrar" }
            </button>
        </form>
    )
}