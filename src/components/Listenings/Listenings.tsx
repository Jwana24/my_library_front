import { useEffect, useState } from "react";
import axios from "axios";
import { Type, Genre, TListenings } from "../../types";
import { generateQueryParameter } from "../../utils";
import LibraryList from "../ReusableComponents/LibraryList/LibraryList";

import Album from '../../assets/album.png';
import Ost from "../../assets/ost.png";

const Status  = [
  {name: "A écouter"},
  {name: "Ecouté"}
]

const Listenings = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [listenings, setListenings] = useState<TListenings[]>([]);

  const getListenings = (selectedGenre: string, selectedStatus: string, searchTitle: string, selectedType: string) => {
    axios.get(`${import.meta.env.VITE_APP_URL}/listening${generateQueryParameter(selectedGenre, selectedStatus, searchTitle, selectedType)}`)
      .then((res) => setListenings(res.data))
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_URL}/listening-type`)
    .then((res) => setTypes(res.data));

    axios.get(`${import.meta.env.VITE_APP_URL}/listening-genre`)
    .then((res) => setGenres(res.data));
  }, []);

  useEffect(() => {
    getListenings(selectedGenre, selectedStatus, searchTitle, selectedType);
  }, [selectedGenre, selectedStatus, searchTitle, selectedType]);

  const getIconForEachListeningType = (type: Type) => {
    switch(type?.name) {
      case "Album":
      default :
        return Album;
      case "OST":
        return Ost;
    }
  }

  const deleteItem = async(id: number) => {
    return axios.delete(`${import.meta.env.VITE_APP_URL}/listening/${id}`)
      .then(() => setListenings(listenings.filter((listening) => listening.id !== id)))
      .catch(error => {
        console.error(error);
      });
  }

  const updateItem = (id?: number) => async(formValues: Record<string, any>) => {
    const genres: Genre[] = formValues.genreIds.map((genreId: number) => ({ id: genreId }));
    const type: Type = { id: formValues.typeId };
    const listening: TListenings = {
      status: formValues.status,
      artist: formValues.artist,
      title: formValues.title,
      genres: genres,
      image: formValues.image,
      type: type,
      rating: formValues.rating
    }

    if (id) {
      return axios.patch(`${import.meta.env.VITE_APP_URL}/listening/${id}`, listening)
        .then((res) => {
          const modifiedListenings = listenings.map((listening) => {
            return listening.id === id ? res.data : listening;
          });

          setListenings(modifiedListenings)
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  const createItem = async(formValues: Record<string, any>) => {
    const genres: Genre[] = formValues.genreIds.map((genreId: number) => ({ id: genreId }));
    const type: Type = { id: formValues.typeId };
    const listening: TListenings = {
      status: formValues.status,
      artist: formValues.artist,
      title: formValues.title,
      genres: genres,
      image: formValues.image,
      type: type
    }

    return axios.post<TListenings>(`${import.meta.env.VITE_APP_URL}/listening`, listening)
      .then((res) => {
        setListenings([
          ...listenings,
          res.data
        ])
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <LibraryList
      getIconForEachType={getIconForEachListeningType}
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
      libraryElements={listenings}
      deleteItem={deleteItem}
      updateItem={updateItem}
      createItem={createItem}
      librarySection="Listenings"
    />
  )
}

export default Listenings;