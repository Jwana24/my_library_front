import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { getLocationPathname } from "../../utils/hooks";
import { Type, Genre, TListenings } from "../../types";
import { generateQueryParameter } from "../../utils";

import Breadcrumb from "../ReusableComponents/Breadcrumb/Breadcrumb";
import SidebarMenu from "../ReusableComponents/SibebarMenu/SidebarMenu";
import FilterGenre from "../ReusableComponents/FilterGenre/FilterGenre";
import FilterStatus from "../ReusableComponents/FilterStatus/FilterStatus";
import SearchBarTitle from "../ReusableComponents/SearchBarTitle/SearchBarTitle";
import CardOfItem from "../ReusableComponents/CardOfItem/CardOfItem";

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
    <Grid container>
      <Breadcrumb currentPath={getLocationPathname()} />
      <Grid item xs={2}>
        <SidebarMenu
          getIconForEachType={getIconForEachListeningType}
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
            {listenings.map((listening) => (
              <CardOfItem key={listening.id} item={listening} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Listenings;