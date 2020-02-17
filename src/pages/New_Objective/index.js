import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'


export default function NewObjective( { history } ){

    const [ loadingState, setLoadingState] = useState(false)
    
    const [ thumbnail, setThumbnail] = useState(null)
    const [ statement, setStatement ] = useState('')

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
        data.set("question_type", "obj")
        
        const activity = await api.post('/activities/new', data, {
            headers: {"module_id": id }
        })

        history.push('/objective/alternative/' + activity.data._id)
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

            <button type ='submit' className="btn" disabled= { loadingState ? true : false } >
                { loadingState ? "Cadastrando . . ."  : "Cadastrar" }
            </button>
        </form>
    )
}