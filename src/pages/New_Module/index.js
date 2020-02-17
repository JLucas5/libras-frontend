import React, { useState } from 'react'

import api from '../../services/api'

import './styles.css'


export default function NewModule( { history } ){

    const [ loadingState, setLoadingState] = useState(false)
    
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')

    async function handleSubmit(event){

        setLoadingState(true)

        event.preventDefault()

        let data = new FormData()

        data.append("name", name)
        data.append("description", description)

        console.log(name)
        
        await api.post('/modules/new', data)

        history.push('/module')
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Novo Módulo</p>
        
            <label htmlFor="name">NOME *</label>
            <input id='name'
            placeholder='O nome do seu módulo'
            value={name}
            onChange = {event => setName(event.target.value)}
            />

            <label htmlFor="description">DESCRIÇÃO *</label>
            <input id='description'
            placeholder='Descrição módulo'
            value={description}
            onChange = {event => setDescription(event.target.value)}
            />

            <button type ='submit' className="btn" disabled= { loadingState ? true : false } >
                { loadingState ? "Cadastrando . . ." : "Cadastrar" }
            </button>
        </form>
    )
}