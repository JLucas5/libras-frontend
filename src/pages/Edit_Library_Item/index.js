import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import api from "../../services/api"

import "./styles.css"

export default function EditLibraryItem({ history }) {
	const youtubeLinkRegex = /(?: https ?: \/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/

	const { id } = useParams()

	const [loadingState, setLoadingState] = useState(false)

	const [type, setType] = useState("")
	const [file, setFile] = useState(null)
	const [link, setLink] = useState("")
	const [name, setName] = useState("")
	const [source, setSource] = useState("")
	const [isWrong, setIsWrong] = useState(false)

	useEffect(() => {
		async function loadActivities() {
			const response = await api.get("/library/" + id)

			setType(response.data.type)
			setLink(response.data.location)
			setName(response.data.name)
			console.log(response.data.source)
			setSource(response.data.source)
		}

		loadActivities()
	}, [id])

	useEffect(() => {
		if (link.match(youtubeLinkRegex) || link === "" || type === "book") {
			setIsWrong(false)
		} else {
			setIsWrong(true)
		}
	}, [link])

	async function handleSubmit(event) {
		setLoadingState(true)

		event.preventDefault()

		let data = new FormData()
		
		data.set("file", file)
		data.set("name", name)
		data.set("link", link)
		data.set("source", source)
		console.log(source)

		await api.post("/library/edit/" + id, data)

		history.push("/library/" + type)
	}

	return (
		<>
			<h1 hidden={type !== "video"}>Biblioteca - Editar Vídeo</h1>
			<h1 hidden={type !== "book"}>Biblioteca - Editar Livro</h1>
			<h1 hidden={type !== "music"}>Biblioteca - Editar Música</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="statement">Nome *</label>
				<input
					id="name"
					placeholder="Nome do conteúdo"
					value={name}
					onChange={(event) => setName(event.target.value)}
					required
				/>

				<label htmlFor="link" hidden={type === "book"}>
					Link do conteúdo *
				</label>
				<p className="errorMsg" hidden={!isWrong}>
					Insira um link válido para o youtube
				</p>
				<input
					className={isWrong ? "red" : ""}
					id="link"
					placeholder="Link do Youtube"
					value={link}
					onChange={(event) => setLink(event.target.value)}
					hidden={type === "book"}
					disabled={type === "book"}
					required
				/>

				<label htmlFor="file" hidden={type !== "book"}>
					Arquivo PDF
				</label>
				<a
					id="btn"
					className="btn"
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					hidden={type !== "book"}>
					{" "}
					Ver arquivo atual
				</a>

				<input
					type="file"
					onChange={(event) => setFile(event.target.files[0])}
					hidden={type !== "book"}
					disabled={type !== "book"}
				/>

				<label htmlFor="statement">Fonte *</label>
				<input
					id="source"
					placeholder="Fonte do conteúdo"
					value={source || ""}
					onChange={(event) => setSource(event.target.value)}
					required
				/>

				<button
					type="submit"
					className="btn"
					disabled={loadingState || isWrong ? true : false}>
					{loadingState ? "Atualizando . . ." : "Atualizar"}
				</button>
			</form>
		</>
	)
}
