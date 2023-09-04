import { useEffect, useState } from "react";
import axios from "axios";
import { Type, Genre, TReadings } from "../../types";
import { generateQueryParameter } from "../../utils";
import LibraryList from "../ReusableComponents/LibraryList/LibraryList";

import Roman from '../../assets/roman.png';
import Manga from "../../assets/manga.png";
import Comic from "../../assets/comics.png";
import BD from "../../assets/bd.png";

const Status  = [
  {name: "En cours de lecture"},
  {name: "A lire"},
  {name: "A acheter"},
  {name: "Lu"}
]

const Readings = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [readings, setReadings] = useState<TReadings[]>([]);

  const getReadings = (selectedGenre: string, selectedStatus: string, searchTitle: string, selectedType: string) => {
    axios.get(`${import.meta.env.VITE_APP_URL}/reading${generateQueryParameter(selectedGenre, selectedStatus, searchTitle, selectedType)}`)
      .then((res) => setReadings(res.data))
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_URL}/reading-type`)
    .then((res) => setTypes(res.data));

    axios.get(`${import.meta.env.VITE_APP_URL}/reading-genre`)
    .then((res) => setGenres(res.data));
  }, []);

  useEffect(() => {
    getReadings(selectedGenre, selectedStatus, searchTitle, selectedType);
  }, [selectedGenre, selectedStatus, searchTitle, selectedType]);

  const getIconForEachReadingType = (type: Type) => {
    switch(type?.name) {
      case "Roman":
      default :
        return Roman;
      case "Manga":
        return Manga;
      case "Comic":
        return Comic;
      case "BD":
        return BD;
    }
  }

  const deleteItem = async(id: number) => {
    return axios.delete(`${import.meta.env.VITE_APP_URL}/reading/${id}`)
      .then(() => setReadings(readings.filter((reading) => reading.id !== id)))
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <LibraryList
      getIconForEachType={getIconForEachReadingType}
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
      libraryElements={readings}
      deleteItem={deleteItem}
    />
  )
}

export default Readings;