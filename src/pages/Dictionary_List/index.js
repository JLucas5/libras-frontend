import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from "../../services/api"

import './styles.css'

export default function DictionaryList(){
    const [dictionary, setDictionary] = useState([])
    
    useEffect(()=> {
        async function loadActivities(){
            const response = await api.get('/dictionary')

            setDictionary(response.data)           
        }

        loadActivities()
    }, [] )
  
    
    return (
<>
            <ul className= 'dictionary-list' id="dictionary">
                {dictionary.map(dictionary_item => (
                    <li key={dictionary_item._id}>
                        <header style = {{
                            backgroundImage: `url(${dictionary_item.location})` }}></header>
                        <strong>{dictionary_item.word}</strong>
                    </li>
                ))}
            </ul>

            <Link to={"/dictionary/new"}><button className='btn'>Cadastrar novo item</button></Link>
        </>
    )
}