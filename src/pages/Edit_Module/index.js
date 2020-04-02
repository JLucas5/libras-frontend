import React, { useState, useMemo, useEffect } from 'react'

import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'
import { useParams } from 'react-router-dom'


export default function EditModule( { history } ){

    const { id } = useParams()

    const [ loadingState, setLoadingState] = useState(false)
    
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ image, setImage] = useState(null)
    const [ old_image, setOld_image] = useState('')
    const [ file, setFile ] = useState(null)
    const [ old_file, setOld_file ] = useState('null')
    const [ link, setLink] = useState('')

    useEffect(()=> {
        async function loadModule(){

            const response = await api.get('/modules/' + id)

            setName(response.data.name)      
            setDescription(response.data.description)      
            setOld_image(response.data.image)
            setLink(response.data.video)
            setOld_file(response.data.pdf)
            setFile(response.data.pdf)      
        }

        loadModule()
    }, [id] )

    const preview = useMemo(
        () => {
            return image ? URL.createObjectURL(image) : null
        },
        [image]
    )

    function deleteImage(){
        setImage(null)
        setOld_image(null)
    }

    function deletePDF(){
        setFile(null)
        setOld_file(null)
    }
    async function handleSubmit(event){

        setLoadingState(true)

        event.preventDefault()

        let data = new FormData()

        data.set("name", name)
        data.set("description", description)
        data.set("thumbnail", image)
        data.set("old_image", old_image)
        data.set("pdf", file)
        data.set("video", link)
        data.set("old_pdf", old_file)

        await api.post('/modules/edit/' + id, data)

        history.push('/module')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Editando Módulo</h1>

            <label htmlFor="name">TÍTULO</label>
            <input id='name'
            placeholder='O nome do seu módulo'
            value={name}
            onChange = {event => setName(event.target.value)}
            />

            <label htmlFor="description">DESCRIÇÃO</label>
            <input id='description'
            placeholder='Descrição do módulo'
            value={description}
            onChange = {event => setDescription(event.target.value)}
            />

            <label htmlFor="description">VÍDEO</label>
            <input id='video'
            placeholder='Link do vídeo'
            value={link}
            onChange = {event => setLink(event.target.value)}
            />

            <p>IMAGEM </p>
            <label
            id="thumbnail" 
            style={{backgroundImage: image ? `url(${preview})` :`url(${old_image})`}}
            className= 'has-thumbnail'>
            <input type="file" onChange={event => setImage(event.target.files[0])} />
            <img src={camera} alt="Select img"/>
            </label>
            <button onClick={event => deleteImage()} type="button" className="remove-button">Remover imagem</button>

            <label htmlFor="file" >Arquivo PDF</label>
            <a id='btn'className="btn" href={old_file} target='_blank'rel="noopener noreferrer" hidden={ !old_file } >Ver PDF antigo</a>
            <input type="file"  onChange={event => setFile(event.target.files[0])}/>
            <button onClick={event => deletePDF()} type="button" className="remove-button">Remover PDF</button>

            <button type ='submit' className="btn" disabled= { loadingState ? true : false } >
                { loadingState ? "Salvando . . ." : "Salvar" }
            </button>
        </form>
    )
}