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
    />
  )
}

export default Listenings;