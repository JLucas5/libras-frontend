import React, { useState } from 'react'

import api from '../../services/api'

import './styles.css'
import { useParams } from 'react-router-dom'


export default function NewLibraryItem( { history } ){

    const [ loadingState, setLoadingState] = useState(false)
    
    const [ file, setFile] = useState(null)
    const [ link, setLink] = useState('')
    const [ name, setName ] = useState('')
    const { type } = useParams()

    async function handleSubmit(event){

        setLoadingState(true)

        event.preventDefault()

        let data = new FormData()

        file ? data.set("file", file) : data.set("file_location", link)
        data.set("name", name)
        data.set("type", type)
        
        await api.post('/library/new', data)

        history.push('/library/' + type)
    }

    return (<>
                <h1 hidden={ type !== 'video' }>Biblioteca - Cadastrar Vídeo</h1>
                <h1 hidden={ type !== 'book' }>Biblioteca - Cadastrar Livro</h1>
                <h1 hidden={ type !== 'music' }>Biblioteca - Cadastrar Música</h1>
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="statement" >Nome *</label>
                    <input id='name'
                    placeholder='Nome do conteúdo'
                    value={name}
                    onChange = {event => setName(event.target.value)}
                    required
                    />

                    <label htmlFor="link" hidden={ type === 'book' } >Link do conteúdo *</label>
                    <input id='link'
                    placeholder='Link do Youtube'
                    value={link}
                    onChange = {event => setLink(event.target.value)}
                    hidden={ type === 'book' }
                    />

                    <label htmlFor="file" hidden={ type !== 'book' } > Arquivo PDF</label>
                    <input type="file"  onChange={event => setFile(event.target.files[0])} hidden={ type !== 'book' }/>


                    <button type ='submit' className="btn" disabled= { loadingState ? true : false } >
                        { loadingState ? "Cadastrando . . ."  : "Cadastrar" }
                    </button>
                </form>
            </>
    )
}