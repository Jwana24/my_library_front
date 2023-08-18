import { useEffect, useState } from "react";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import Movie from "../../assets/film.png";
import Serie from "../../assets/serie.png";
import Anime from "../../assets/animes.png";
import Show from "../../assets/tv.png";
import "./Watchings.scss";
import axios from "axios";

type TypeOfWatching = {
  id: number;
  name: string;
};

type Watchings = {
  id: number;
  status: string;
  producer: string;
  title: string;
  image: string;
  saga: boolean;
  summary: string;
  type: TypeOfWatching;
  genres: number[];
}

const Readings = () => {
  const [types, setTypes] = useState<TypeOfWatching[]>([]);
  const [watchings, setWatchings] = useState<Watchings[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_URL}/watching-type`)
    .then((res) => setTypes(res.data))
  }, []);

  const getIconForEachWatchingType = (types: TypeOfWatching) => {
    switch(types?.name) {
      case "Film":
        return Movie;
        break;
      case "Série":
        return Serie;
        break;
      case "Anime":
        return Anime;
        break;
      case "Emission TV":
        return Show;
        break;
      default :
        return Movie;
        break;
    }
  }

  // useEffect(() => {
  //   axios.get(`${import.meta.env.VITE_APP_URL}/watching`)
  //   .then((res) => setWatchings(res.data))
  // }, []);

  const sortWatchingByType = () => {
    axios.get(`${import.meta.env.VITE_APP_URL}/watching?filter[type]=Film`)
      .then((res) => console.log(res.data))
  }

  sortWatchingByType()

  return (
    <Grid container>
      <Grid item xs={12} className="BreadcrumbContainer">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="text.secondary" href="/">Accueil</Link>
          <Typography color="text.primary">Visionnages</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={2} className="GeneralGrid">
        {types.map((type) => (
          <Grid container className="MenuGrid" key={type?.id}>
            <Grid item xs={12}>
              <img src={getIconForEachWatchingType(type)} alt={`Icône ${type?.name}`} />
              <Link>{type?.name}</Link>
            </Grid>
          </Grid>
        ))}
        
      </Grid>
      <Grid item xs={10} className="GeneralGrid">
        Liste des trucs à voir
      </Grid>
    </Grid>
  )
}

export default Readings;