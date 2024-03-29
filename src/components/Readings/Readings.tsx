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

  const updateItem = (id?: number) => async(formValues: Record<string, any>) => {
    const genres: Genre[] = formValues.genreIds.map((genreId: number) => ({ id: genreId }));
    const type: Type = { id: formValues.typeId };
    const reading: TReadings = {
      status: formValues.status,
      author: formValues.author,
      title: formValues.title,
      saga: formValues.saga,
      lang: formValues.lang,
      genres: genres,
      image: formValues.image,
      summary: formValues.summary,
      type: type,
      rating: formValues.rating
    }

    if (id) {
      return axios.patch(`${import.meta.env.VITE_APP_URL}/reading/${id}`, reading)
        .then((res) => {
          const modifiedReadings = readings.map((reading) => {
            return reading.id === id ? res.data : reading;
          });

          setReadings(modifiedReadings)
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  const createItem = async(formValues: Record<string, any>) => {
    const genres: Genre[] = formValues.genreIds.map((genreId: number) => ({ id: genreId }));
    const type: Type = { id: formValues.typeId };
    const reading: TReadings = {
      status: formValues.status,
      author: formValues.author,
      title: formValues.title,
      saga: formValues.saga,
      lang: formValues.lang,
      genres: genres,
      image: formValues.image,
      summary: formValues.summary,
      type: type
    };

    return axios.post<TReadings>(`${import.meta.env.VITE_APP_URL}/reading`, reading)
      .then((res) => {
        setReadings([
          ...readings,
          res.data
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const createGenre = async(genreName: string, typeId: number) => {
    const genre: Genre = { name: genreName, type: { id: typeId } };

    return axios.post<Genre>(`${import.meta.env.VITE_APP_URL}/reading-genre`, genre)
      .then((res) => {
        setGenres([
          ...genres,
          res.data
        ]);

        const modifiedType = types.map((type) => {
          return type.id === typeId ?
            {
              ...type,
              genres: [ ...type.genres!, res.data ]
            }
          : type;
        });

        setTypes(modifiedType);
      })
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
      updateItem={updateItem}
      createItem={createItem}
      createGenre={createGenre}
      librarySection="Readings"
    />
  )
}

export default Readings;