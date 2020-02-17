import React, { useState, useMemo } from 'react'

import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'


export default function NewLibraryItem( { history } ){

    const [ loadingState, setLoadingState] = useState(false)
    
    const [ thumbnail, setThumbnail] = useState(null)
    const [ location, setLocation] = useState('')
    const [ name, setName ] = useState('')

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
        data.set("word", name)
        
        await api.post('/library/new', data)

        history.push('/library')
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
            placeholder='Nome do conteúdo'
            value={name}
            onChange = {event => setName(event.target.value)}
            />

            <label htmlFor="location">Link do conteúdo *</label>
            <input id='location'
            placeholder='Link caso esteja no Youtube. Sobreescreve o upload acima.'
            value={location}
            onChange = {event => setLocation(event.target.value)}
            />
            <button type ='submit' className="btn" disabled= { loadingState ? true : false } >
                { loadingState ? "Cadastrando . . ."  : "Cadastrar" }
            </button>
        </form>
    )
}