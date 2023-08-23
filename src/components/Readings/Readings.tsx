import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { getLocationPathname } from "../../utils/hooks";
import { Type, Genre, TReadings } from "../../types";
import { generateQueryParameter } from "../../utils";

import Breadcrumb from "../ReusableComponents/Breadcrumb/Breadcrumb";
import SidebarMenu from "../ReusableComponents/SibebarMenu/SidebarMenu";
import FilterGenre from "../ReusableComponents/FilterGenre/FilterGenre";
import FilterStatus from "../ReusableComponents/FilterStatus/FilterStatus";
import SearchBarTitle from "../ReusableComponents/SearchBarTitle/SearchBarTitle";
import CardOfItem from "../ReusableComponents/CardOfItem/CardOfItem";

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

  return (
    <Grid container>
      <Breadcrumb currentPath={getLocationPathname()} />
      <Grid item xs={2}>
        <SidebarMenu
          getIconForEachType={getIconForEachReadingType}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          types={types}
        />
      </Grid>
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={12}>
            <div>
              {selectedType !== "" && (
                <FilterGenre
                  setSelectedGenre={setSelectedGenre}
                  selectedGenre={selectedGenre}
                  genres={genres}
                />
              )}
              <FilterStatus
                setSelectedStatus={setSelectedStatus}
                selectedStatus={selectedStatus}
                status={Status}
              />
              <SearchBarTitle
                setSearchTitle={setSearchTitle}
                searchTitle={searchTitle}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex" }}>
            {readings.map((reading) => (
              <CardOfItem key={reading.id} item={reading} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Readings;