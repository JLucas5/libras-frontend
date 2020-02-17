import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from "../../services/api"

import './styles.css'

export default function ActivityList( { history }){

    const [activities, setActivities] = useState([])
    const { id } = useParams()
    console.log(activities)
    
    useEffect(()=> {
        async function loadActivities(){
            const response = await api.get('/modules/' + id)

            setActivities(response.data)           
        }

        loadActivities()
    }, [id] )
  
    
    return (
<>
            <ul className= 'activity-list' id="atividades">
                {activities.map(activity => (
                    <li key={activity._id}>
                        <header style = {{
                            backgroundImage: `url(${activity.location})` }}></header>
                        <strong>{activity.statement}</strong>
                        <span>{activity.expected_answer  
                            ?<span className="expected_answer">
                                <span className="resposta">Resposta esperada: </span> 
                                {activity.expected_answer} 
                            </span> 
                            :<ul className = 'alternatives'>
                                {activity.alternatives.map( alternative =>(
                                    <li key={alternative.text}>
                                        <header style = {{
                                            backgroundImage: `url(${alternative.location})` }}></header>
                                        <p>
                                            {alternative.text}
                                        </p>
                                        
                                    </li>
                                ))}
                            </ul>
                        }</span>
                    </li>
                ))}
            </ul>

            <Link to={"/activities/" + id + "/new"}><button className='btn'>Cadastrar nova Atividade</button></Link>
        </>
    )
}