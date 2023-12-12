import { Grid, Typography } from "@mui/material";
import { getLocationPathname } from "../../../utils/hooks";
import { Type, Genre, TListenings, TReadings, TWatchings } from "../../../types";

import Breadcrumb from "../Breadcrumb/Breadcrumb";
import SidebarMenu from "../SibebarMenu/SidebarMenu";
import FilterGenre from "../FilterGenre/FilterGenre";
import FilterStatus from "../FilterStatus/FilterStatus";
import SearchBarTitle from "../SearchBarTitle/SearchBarTitle";
import CardOfItem from "../CardOfItem/CardOfItem";

interface ILibraryList {
  getIconForEachType: (type: Type) => string
  selectedType: string
  setSelectedType: React.Dispatch<React.SetStateAction<string>>
  types: Type[]
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>
  selectedGenre: string
  genres: Genre[]
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  status: Array<{ name: string }>
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>
  searchTitle: string
  libraryElements:  TWatchings[] | TReadings[] | TListenings[]
  deleteItem: (id: number) => Promise<void>
  updateItem: (id: number, formValues: object) => Promise<void>
}

const LibraryList = ({
  getIconForEachType,
  selectedType,
  setSelectedType,
  types,
  setSelectedGenre,
  selectedGenre,
  genres,
  setSelectedStatus,
  selectedStatus,
  status,
  setSearchTitle,
  searchTitle,
  libraryElements,
  deleteItem,
  updateItem
}: ILibraryList) => {
  return (
    <Grid container>
      <Breadcrumb currentPath={getLocationPathname()} />
      <Grid item xs={2}>
        <SidebarMenu
          getIconForEachType={getIconForEachType}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          types={types}
        />
      </Grid>
      <Grid item xs={10} sx={{ borderLeft: "1px solid #ecf0f1", paddingLeft: "15px" }}>
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
                status={status}
              />
              <SearchBarTitle
                setSearchTitle={setSearchTitle}
                searchTitle={searchTitle}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", marginTop: "15px" }}>
          {libraryElements.map((libraryElement) => (
            <div key={libraryElement.id} style={{ ...(libraryElement.id !== libraryElements[libraryElements.length - 1].id && { marginRight: "15px" }) }}>
              <CardOfItem item={libraryElement} deleteItem={deleteItem} updateItem={updateItem} genres={genres} status={status} />
              <Typography variant="body2" sx={{ width: "200px" }}>{libraryElement.title}</Typography>
            </div>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LibraryList;