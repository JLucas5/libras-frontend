import React, { useState, useMemo, useEffect } from "react"

import api from "../../services/api"

import camera from "../../assets/camera.svg"
import "./styles.css"

export default function NewDictionaryItem({ history }) {
	const youtubeLinkRegex = /(?: https ?: \/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/

	const [loadingState, setLoadingState] = useState(false)

	const [thumbnail, setThumbnail] = useState(null)
	const [word, setWord] = useState("")
	const [video, setVideo] = useState("")
	const [meaning, setMeaning] = useState("")
	const [isWrong, setIsWrong] = useState(false)

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null
	}, [thumbnail])

	useEffect(() => {
		if (video.match(youtubeLinkRegex) || video === "") {
			setIsWrong(false)
		} else {
			setIsWrong(true)
		}
	}, [video])

	async function handleSubmit(event) {
		setLoadingState(true)

		event.preventDefault()

		let data = new FormData()

		data.set("thumbnail", thumbnail)
		data.set("word", word)
		data.set("video", video)
		data.set("meaning", meaning)

		await api.post("/dictionary/new", data)

		history.push("/dictionary")
	}

	return (
		<>
			<h1>Dicionário - Cadastrar Palavra</h1>
			<form onSubmit={handleSubmit}>
				<label
					id="thumbnail"
					style={{ backgroundImage: `url(${preview})` }}
					className={thumbnail ? "has-thumbnail" : ""}>
					<input
						type="file"
						onChange={(event) =>
							setThumbnail(event.target.files[0])
						}
					/>
					<img src={camera} alt="Select img" />
				</label>

				<label htmlFor="statement">Vídeo</label>
				<p className="errorMsg" hidden={!isWrong}>
					Insira um link válido para o youtube
				</p>
				<input
					className={isWrong ? "red" : ""}
					id="video"
					placeholder="Link do youtube da palavra em LIBRAS"
					value={video}
					onChange={(event) => setVideo(event.target.value)}
				/>

				<label htmlFor="statement">Palavra *</label>
				<input
					id="word"
					placeholder="A palavra em português"
					value={word}
					onChange={(event) => setWord(event.target.value)}
				/>
				<label htmlFor="statement">Significado</label>
				<input
					id="meaning"
					placeholder="O significado em português"
					value={meaning}
					onChange={(event) => setMeaning(event.target.value)}
				/>
				<button
					type="submit"
					className="btn"
					disabled={loadingState || isWrong ? true : false}>
					{loadingState ? "Cadastrando . . ." : "Cadastrar"}
				</button>
			</form>
		</>
	)
}
