import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

import camera from "../../assets/camera.svg";
import "./styles.css";

export default function EditDictionaryItem({ history }) {
  const youtubeLinkRegex = /(?: https ?: \/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/;

  const { id } = useParams();

  const [loadingState, setLoadingState] = useState(false);

  const [previous_image, setPrevious_image] = useState("");

  const [thumbnail, setThumbnail] = useState(null);
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [video, setVideo] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [category, setCategory] = useState("OUTRO");

  useEffect(() => {
    async function loadActivities() {
      const response = await api.get("/dictionary/" + id);

      setPrevious_image(response.data.location);
      setWord(response.data.word);
      setVideo(response.data.video);
      setMeaning(response.data.meaning);
      setCategory(response.data.category);
    }

    loadActivities();
  }, [id]);

  useEffect(() => {
    if (video.match(youtubeLinkRegex) || video === "") {
      setIsWrong(false);
    } else {
      setIsWrong(true);
    }
  }, [video, youtubeLinkRegex]);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    setLoadingState(true);

    event.preventDefault();

    let data = new FormData();

    data.set("thumbnail", thumbnail);
    data.set("word", word);
    data.set("video", video);
    data.set("meaning", meaning);
    data.set("category", category);

    data.set("old_image", previous_image);

    await api.post("/dictionary/edit/" + id, data);

    history.push("/dictionary/");
  }

  return (
    <>
      <h1>Dicionário - Editar Palavra</h1>

      <form onSubmit={handleSubmit}>
        <label
          id="thumbnail"
          style={{
            backgroundImage: thumbnail
              ? `url(${preview})`
              : `url(${previous_image})`,
          }}
          className={""}
        >
          <input
            type="file"
            onChange={(event) => setThumbnail(event.target.files[0])}
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
        <label htmlFor="meaning">Significado</label>
        <input
          id="meaning"
          placeholder="O significado em português"
          value={meaning}
          onChange={(event) => setMeaning(event.target.value)}
        />

        <label htmlFor="category">Categoria</label>
        <select
        id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="OUTRO"> -- Selecione -- </option>
          <option value="ALFABETO">Alfabeto</option>
          <option value="NUMERAL">Numeral</option>
        </select>

        <button
          type="submit"
          className="btn"
          disabled={loadingState || isWrong ? true : false}
        >
          {loadingState ? "Atualizando . . ." : "Atualizar"}
        </button>
      </form>
    </>
  );
}
