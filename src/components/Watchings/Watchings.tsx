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

  const updateItem = (id?: number) => async(formValues: Record<string, any>) => {
    const genres: Genre[] = formValues.genreIds.map((genreId: number) => ({ id: genreId }));
    const type: Type = { id: formValues.typeId };
    const watching: TWatchings = {
      status: formValues.status,
      producer: formValues.producer,
      title: formValues.title,
      saga: formValues.saga,
      genres: genres,
      image: formValues.image,
      summary: formValues.summary,
      type: type,
      rating: formValues.rating
    }

    if (id) {
      return axios.patch(`${import.meta.env.VITE_APP_URL}/watching/${id}`, watching)
        .then((res) => {
          const modifiedWatchings = watchings.map((watching) => {
            return watching.id === id ? res.data : watching;
          });

          setWatchings(modifiedWatchings)
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  const createItem = async(formValues: Record<string, any>) => {
    const genres: Genre[] = formValues.genreIds.map((genreId: number) => ({ id: genreId }));
    const type: Type = { id: formValues.typeId };
    const watching: TWatchings = {
      status: formValues.status,
      producer: formValues.artist,
      title: formValues.title,
      saga: formValues.saga,
      genres: genres,
      image: formValues.image,
      summary: formValues.summary,
      type: type
    }

    return axios.post<TWatchings>(`${import.meta.env.VITE_APP_URL}/watching`, watching)
      .then((res) => {
        setWatchings([
          ...watchings,
          res.data
        ])
      })
      .catch(error => {
        console.error(error);
      });
  }

  const createGenre = async(genreName: string, typeId: number) => {
    const genre: Genre = { name: genreName, type: { id: typeId } };

    return axios.post<Genre>(`${import.meta.env.VITE_APP_URL}/watching-genre`, genre)
      .then((res) => {
        setGenres([
          ...genres,
          res.data
        ]);
        const modifiedType = types.map((type) => {
          return type.id === typeId ?
            {
              ...types,
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
      updateItem={updateItem}
      createItem={createItem}
      createGenre={createGenre}
      librarySection="Watchings"
    />
  )
}

export default Watchings;