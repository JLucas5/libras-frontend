import React, { useState, useMemo } from 'react'

import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'


export default function NewDictionaryItem( { history } ){

    const [ loadingState, setLoadingState] = useState(false)
    
    const [ thumbnail, setThumbnail] = useState(null)
    const [ word, setWord ] = useState('')

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
        data.set("word", word)
        
        await api.post('/dictionary/new', data)

        history.push('/dictionary')
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
            

            <label htmlFor="statement">Palavra *</label>
            <input id='word'
            placeholder='A palavra em português'
            value={word}
            onChange = {event => setWord(event.target.value)}
            />
            <button type ='submit' className="btn" disabled= { loadingState ? true : false } >
                { loadingState ? "Cadastrando . . ."  : "Cadastrar" }
            </button>
        </form>
    )
}