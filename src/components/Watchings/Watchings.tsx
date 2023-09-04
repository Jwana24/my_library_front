import { useEffect, useState } from "react";
import axios from "axios";
import { generateQueryParameter } from "../../utils";
import { Type, Genre, TWatchings } from "../../types";
import LibraryList from "../ReusableComponents/LibraryList/LibraryList";

import Movie from "../../assets/film.png";
import Serie from "../../assets/serie.png";
import Anime from "../../assets/animes.png";
import Show from "../../assets/tv.png";

const Status  = [
  {name: "En cours de visionnage"},
  {name: "A voir"},
  {name: "Vu"}
]

const Watchings = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [watchings, setWatchings] = useState<TWatchings[]>([]);

  const getWatchings = (selectedGenre: string, selectedStatus: string, searchTitle: string, selectedType: string) => {
    axios.get(`${import.meta.env.VITE_APP_URL}/watching${generateQueryParameter(selectedGenre, selectedStatus, searchTitle, selectedType)}`)
      .then((res) => setWatchings(res.data))
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_URL}/watching-type`)
    .then((res) => setTypes(res.data));

    axios.get(`${import.meta.env.VITE_APP_URL}/watching-genre`)
    .then((res) => setGenres(res.data));
  }, []);

  useEffect(() => {
    getWatchings(selectedGenre, selectedStatus, searchTitle, selectedType);
  }, [selectedGenre, selectedStatus, searchTitle, selectedType]);

  const getIconForEachWatchingType = (type: Type) => {
    switch(type?.name) {
      case "Film":
      default :
        return Movie;
      case "Série":
        return Serie;
      case "Anime":
        return Anime;
      case "Emission TV":
        return Show;
    }
  }

  const deleteItem = async(id: number) => {
    return axios.delete(`${import.meta.env.VITE_APP_URL}/watching/${id}`)
      .then(() => setWatchings(watchings.filter((watching) => watching.id !== id)))
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <LibraryList
      getIconForEachType={getIconForEachWatchingType}
      selectedType={selectedType}
      setSelectedType={setSelectedType}
      types={types}
      setSelectedGenre={setSelectedGenre}
      selectedGenre={selectedGenre}
      genres={genres}
      setSelectedStatus={setSelectedStatus}
      selectedStatus={selectedStatus}
      status={Status}
      setSearchTitle={setSearchTitle}
      searchTitle={searchTitle}
      libraryElements={watchings}
      deleteItem={deleteItem}
    />
  )
}

export default Watchings;