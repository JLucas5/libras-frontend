import React from 'react'
import { useParams } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'
import { Row, Col } from 'react-bootstrap'

export default function ActivityList({ history  }){

    const { id } = useParams()

    async function toObjective(){

        let data = new FormData()

        data.set("question_type", "obj")
        data.set("module_id", id)
        const response = await api.post('/activities/new', data)

        history.push('/activity/edit/' + response.data._id)
    }

    async function toSubjective(){

        let data = new FormData()

        data.set("question_type", "sub")
        data.set("module_id", id)
        const response = await api.post('/activities/new', data)

        history.push('/activity/edit/' + response.data._id)
    }

    return (
        <>
            <Row>
                <Col md={6}>
                    <button onClick={() => {toObjective()}} >
                        Questão Objetiva
                    </button>
                </Col>
                <Col md={6}>
                    <button onClick={() => {toSubjective()}} >
                        Questão Discursiva
                    </button>
                </Col>
            </Row>
        </>
    )
}