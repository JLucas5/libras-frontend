import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'


export default function NewSubjective( { history } ){

    const [ loadingState, setLoadingState] = useState(false)
    
    const [ thumbnail, setThumbnail] = useState(null)
    const [ statement, setStatement ] = useState('')
    const [ expected_answer, setExpected_answer ] = useState('')

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
        data.set("statement", statement)
        data.set("expected_answer", expected_answer)
        data.set("question_type", "sub")

        console.log(data.statement, id, statement, expected_answer )
        
        await api.post('/activities/new', data, {
            headers: {"module_id": id }
        })

        history.push('/module')
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
            

            <label htmlFor="statement">ENUNCIADO *</label>
            <input id='enunciado'
            placeholder='A pergunta da questão'
            value={statement}
            onChange = {event => setStatement(event.target.value)}
            />

            <label htmlFor="price">RESPOSTA ESPERADA *</label>
            <input id='answer'
            placeholder='Qual a resposta correta'
            value={expected_answer}
            onChange = {event => setExpected_answer(event.target.value)}
            />

            <button type ='submit' className="btn" disabled= { loadingState ? true : false } >
                { loadingState ? "Cadastrando . . ."  : "Cadastrar" }
            </button>
        </form>
    )
}