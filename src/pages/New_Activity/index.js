import React from 'react'
import { useParams } from 'react-router-dom'

import './styles.css'

export default function ActivityList({ history  }){

    const { id } = useParams()


    function toObjective(){

        history.push('/objective/new/' + id)
    }

    function toSubjective(){

        history.push('/subjective/new/' + id)

    }

    return (
        <>
            <ul className= 'activites-options'>
                    <li onClick={() => {toObjective()}} key='objetiva'>
                        <p>
                            Questão Objetiva
                        </p> 
                    </li>
                    <li onClick={() => {toSubjective()}} key='subjetiva'>
                        <p>
                            Questão Subjetiva
                        </p>
                    </li>
            </ul>
        </>
    )
}