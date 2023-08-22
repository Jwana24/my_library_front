import { ChangeEvent, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import Movie from "../../assets/film.png";
import Serie from "../../assets/serie.png";
import Anime from "../../assets/animes.png";
import Show from "../../assets/tv.png";
import MGlass from "../../assets/mglass.png";
import "./Watchings.scss";

type TypeOfWatching = {
  id: number;
  name: string;
};

type GenreOfWatching = {
  id: number;
  name: string;
  type: TypeOfWatching;
}

type Watchings = {
  id: number;
  status: string;
  producer: string;
  title: string;
  image: string;
  saga: boolean;
  summary: string;
  type: TypeOfWatching;
  genres: GenreOfWatching;
}

const Status  = [
  {name: "En cours de visionnage"},
  {name: "A voir"},
  {name: "Vu"}
]

const Readings = () => {
  const [types, setTypes] = useState<TypeOfWatching[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [genres, setGenres] = useState<GenreOfWatching[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [watchings, setWatchings] = useState<Watchings[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_URL}/watching-type`)
    .then((res) => setTypes(res.data));

    axios.get(`${import.meta.env.VITE_APP_URL}/watching-genre`)
    .then((res) => setGenres(res.data));
  }, []);

  useEffect(() => {
    getWatchings();
  }, [selectedGenre, selectedStatus, searchTitle, selectedType]);

  const getIconForEachWatchingType = (types: TypeOfWatching) => {
    switch(types?.name) {
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

  const generateQueryParameter = useMemo(() => {
    let queryParam = '?';
    if (selectedType) {
      console.log(selectedType);
      
      queryParam += `&filter[type]=${selectedType}`;
    }
    if (selectedGenre) {
      queryParam += `&filter[genre]=${selectedGenre}`;
    }
    if (selectedStatus) {
      queryParam += `&filter[status]=${selectedStatus}`;
    }
    if (searchTitle) {
      queryParam += `&filter[title]=${searchTitle}`;
    }
    return queryParam;
  }, [selectedGenre, selectedStatus, searchTitle, selectedType]);

  const getWatchings = () => {
    axios.get(`${import.meta.env.VITE_APP_URL}/watching${generateQueryParameter}`)
      .then((res) => setWatchings(res.data))
  }

  const handleChangeGenre = (event: SelectChangeEvent) => {
    setSelectedGenre(event.target.value);
  };

  const handleOnClickTab = (type: string) => (event: React.MouseEvent<HTMLElement>) => {
    setSelectedType(type);
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  return (
    <Grid container className="Watchings">
      <Grid item xs={12} className="BreadcrumbContainer">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="text.secondary" href="/">Accueil</Link>
          <Typography color="text.primary">Visionnages</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={2}>
        <List className="ListOfTypes">
          <ListItemButton
            onClick={handleOnClickTab("")}
            selected={"" === selectedType}
            className="MenuGrid"
          >
            <ListItemText primary="Tous les visionnages" />
          </ListItemButton>
          {types.map((type) => (
            <ListItemButton
              key={type.id}
              onClick={handleOnClickTab(type.name)}
              selected={type.name === selectedType}
              className="MenuGrid"
            >
              <ListItemIcon>
                <img src={getIconForEachWatchingType(type)} alt={`Icône ${type?.name}`} />
              </ListItemIcon>
              <ListItemText primary={type?.name} />
            </ListItemButton>
          ))}
        </List>
      </Grid>
      <Grid item xs={10} className="WatchingsContainer">
          <Grid container>
            <Grid item xs={12}>
              <div>
                <FormControl sx={{ mr: 1, ml: 2, minWidth: 120 }} size="small">
                  <Select
                    value={selectedGenre}
                    onChange={handleChangeGenre}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">
                      <em>Tous les genres</em>
                    </MenuItem>
                    {genres.map((genre) => (
                      <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ mr: 1, minWidth: 120 }} size="small">
                  <Select
                    value={selectedStatus}
                    onChange={handleChangeStatus}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">
                      <em>Tous les status</em>
                    </MenuItem>
                    {Status.map((status, index) => (
                      <MenuItem key={index} value={status.name}>{status.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ mr: 1, width: '25ch' }} variant="outlined" size="small">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    placeholder="Titre à rechercher"
                    defaultValue={searchTitle}
                    onChange={handleChangeTitle}
                    endAdornment={
                      <InputAdornment position="end">
                        <img src={MGlass} alt="Icône d'une loupe" />
                      </InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                </FormControl>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sx={{ display: "flex" }}>
              {watchings.map((watching) => (
                <Card key={watching.id} sx={{ ml: 2, mt: 2, width: '250px' }}>
                  <CardActionArea href={`watchings/${watching.id}`}>
                    <CardContent>
                      <img src={watching.image} alt={`Affiche ${watching.title}`} />
                      <Typography variant="h6">{watching.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  )
}

export default Readings;