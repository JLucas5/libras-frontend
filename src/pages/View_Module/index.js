import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from "../../services/api"

import './styles.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Table } from 'react-bootstrap'

export default function ViewModule( { history }){

    const [ module_, setModule ] = useState({})
    const [ activities , setActivities ] = useState([])
    const { id } = useParams()


    async function deleteModule(id){

        const response = await api.delete('modules/delete/' + id)
        
        history.push('/module')
    }
    
    useEffect(()=> {
        async function loadApiData(){

            let response = await api.get('/modules/' + id)

            setModule(response.data)    
            
            response = await api.get('/activities/all/' + id)

            setActivities(response.data)
        }

        loadApiData()
    }, [id] )
  
    
    return (
        <>
            <Row><h4>{module_.name}</h4></Row>
            <Row><h5>{module_.description}</h5></Row>

            <Row>
                <Col><Link to={"/activities/new/" + id}><button className='btn'>Cadastrar nova Atividade</button></Link></Col>
                <Col><Link to={"/module/edit/" + id}><button className='btn' id="editar">Editar Módulo</button></Link></Col>
                <Col><button onClick = {event => deleteModule(id)} className='btn' id="excluir">Excluir módulo</button></Col>
            </Row>

            <Row>
                <Col md={8}>
                    <Table className= 'activity-list' id="atividades">
                        <thead>
                            <tr>
                                <th>Atividades</th>
                            </tr>
                        </thead>
                        <tbody>      
                        {activities.map(activity => (
                            <tr key={activity._id}>
                                <td> 
                                    <Row > 
                                        <Col md={9}> {activity.statement}</Col>
                                        <Col md={1}><button className='editaratv'>  Editar  </button></Col>
                                        <Col md={1}><button className='excluiratv'>  Excluir  </button></Col>
                                        <Col md={1}></Col>
                                    </Row>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
                <Col md={4}></Col>
            </Row>
        </>
    )
}