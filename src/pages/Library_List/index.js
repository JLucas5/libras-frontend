import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from "../../services/api"

import './styles.css'

export default function LibraryList(){
    const [library, setLibrary] = useState([])
    
    useEffect(()=> {
        async function loadActivities(){
            const response = await api.get('/library')

            setLibrary(response.data)           
        }

        loadActivities()
    }, [] )
  
    
    return (
<>
            <ul className= 'library-list' id="library">
                {library.map(library_item => (
                    <li key={library_item._id}>
                        <header style = {{
                            backgroundImage: `url(${library_item.location})` }}></header>
                        <strong>{library_item.word}</strong>
                    </li>
                ))}
            </ul>

            <Link to={"/library/new"}><button className='btn'>Cadastrar novo item</button></Link>
        </>
    )
}