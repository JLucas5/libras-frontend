import React, { useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import api from "../../services/api"

import './styles.css'

export default function LibraryList(){
    const [ library, setLibrary ] = useState([])
    const { type } = useParams()

    async function deleteItem(id){

        await api.delete('/library/delete/' + id)

        window.location.reload()
        
    }

    useEffect(( )=> {
        async function loadActivities(){

            const response = await api.post('/library/view/' + type)

            setLibrary(response.data)           
        }

        loadActivities()
    }, [type] )
  
    
    return (
        <>
            <h1>Biblioteca</h1>
            <Link to={"/library/new/" + type}><button className='btn'>Cadastrar novo item</button></Link>
            <ul className= 'library-list' id="library">
                {library.map(library_item => (
                    <li key={library_item._id}>
                        <strong>{library_item.name}</strong>
                        <p>   
                            <Link to={"/library/edit/" + library_item._id}><button className='btn' id='editar'>editar</button></Link>
                            <button className='btn' id='excluir' onClick={event => deleteItem(library_item._id)}>excluir</button>
                        </p>
                    </li>
                ))}
            </ul>

        </>
    )
}