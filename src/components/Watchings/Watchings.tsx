import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { getLocationPathname } from "../../utils/hooks";
import { generateQueryParameter } from "../../utils";
import { Type, Genre, TWatchings } from "../../types";

import Breadcrumb from "../ReusableComponents/Breadcrumb/Breadcrumb";
import SidebarMenu from "../ReusableComponents/SibebarMenu/SidebarMenu";
import FilterGenre from "../ReusableComponents/FilterGenre/FilterGenre";
import FilterStatus from "../ReusableComponents/FilterStatus/FilterStatus";
import SearchBarTitle from "../ReusableComponents/SearchBarTitle/SearchBarTitle";
import CardOfItem from "../ReusableComponents/CardOfItem/CardOfItem";

import Movie from "../../assets/film.png";
import Serie from "../../assets/serie.png";
import Anime from "../../assets/animes.png";
import Show from "../../assets/tv.png";

import "./Watchings.scss";

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

  return (
    <Grid container className="Watchings">
      <Breadcrumb currentPath={getLocationPathname()} />
      <Grid item xs={2}>
        <SidebarMenu
          getIconForEachType={getIconForEachWatchingType}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          types={types}
        />
      </Grid>
      <Grid item xs={10} className="WatchingsContainer">
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
              {watchings.map((watching) => (
                <CardOfItem key={watching.id} item={watching} />
              ))}
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  )
}

export default Watchings;