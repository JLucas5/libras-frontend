import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from "../../services/api"

import './styles.css'

export default function ModuleList({ history }){

    const [modules, setModules] = useState([])
    
    useEffect(()=> {
        async function loadModules(){
            const response = await api.get('/modules')

            setModules(response.data)           
        }

        loadModules()
    }, [] )
  
    function openModule(id){
        history.push("/module/view/" + id)
    }
    return (
        <>
            <h1>Módulos</h1>
            <Link to="/module/new"><button className='btn'>Cadastrar novo módulo</button></Link>

            <ul className= 'module-list'>
                {modules.map(module => (
                    <li onClick={() => {openModule(module._id)}} key={module._id}>
                        <strong>{module.name}</strong>
                        <span>{module.description}</span>
                    </li>
                ))}
            </ul>

        </>
    )
}