import { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getLocationPathname } from "../../../utils/hooks";
import { Type, Genre, TListenings, TReadings, TWatchings } from "../../../types";

import Breadcrumb from "../Breadcrumb/Breadcrumb";
import SidebarMenu from "../SibebarMenu/SidebarMenu";
import FilterGenre from "../FilterGenre/FilterGenre";
import FilterStatus from "../FilterStatus/FilterStatus";
import SearchBarTitle from "../SearchBarTitle/SearchBarTitle";
import ModalOfItem from "../Modals/ModalOfItem.tsx";
import FormModal from "../Modals/FormModal";
import Plus from "../../../assets/plus.png";

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
  updateItem: (id?: number) => (formValues: object) => Promise<void>
  createItem: (formValues: object) => Promise<void>
  librarySection: string
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
  updateItem,
  createItem,
  librarySection
}: ILibraryList) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleClickCreate = () => {
    handleOpenCreateModal();
  }

  return (
    <Grid container>
      <Breadcrumb currentPath={getLocationPathname()} />
      <Grid item xs={12} lg={2}>
        <SidebarMenu
          getIconForEachType={getIconForEachType}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          types={types}
        />
      </Grid>
      <Grid item xs={12} lg={10} sx={{ borderLeft: { lg: "1px solid #ecf0f1"}, paddingLeft: { lg: "15px"} }}>
        <Grid container>
          <Grid item xs={12}>
            <div>
              <Grid container>
                {selectedType !== "" && (
                  <Grid item xs={12} lg={3} sx={{ pr: { lg: 1 }, mt: { xs: 2, lg: 0 } }}>
                    <FilterGenre
                      setSelectedGenre={setSelectedGenre}
                      selectedGenre={selectedGenre}
                      genres={genres}
                    />
                  </Grid>
                )}
                <Grid item xs={12} lg={3} sx={{ pr: { lg: 1 }, mt: { xs: 2, lg: 0 } }}>
                  <FilterStatus
                    setSelectedStatus={setSelectedStatus}
                    selectedStatus={selectedStatus}
                    status={status}
                  />
                </Grid>
                <Grid item xs={12} lg={3} sx={{ pr: { lg: 1 }, mt: { xs: 2, lg: 0 } }}>
                  <SearchBarTitle
                    setSearchTitle={setSearchTitle}
                    searchTitle={searchTitle}
                  />
                </Grid>
                <Grid item xs={12} lg={3} sx={{ mt: { xs: 2, lg: 0 } }}>
                  <Button
                    onClick={handleClickCreate}
                    variant="contained"
                    size="medium"
                    startIcon={<img src={Plus} style={{ width: "22px" }} alt="Icône d'un plus encerclé" />}
                  >
                    Ajouter un élément
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12} mt={2}>
            <Grid container>
              {libraryElements.map((libraryElement) => (
                <Grid item xs={12} lg={3} key={libraryElement.id}>
                  <Box sx={{ display: { xs: "flex", lg: "block" }, mb: { xs: 2, lg: 0 } }}>
                    <ModalOfItem
                      item={libraryElement}
                      deleteItem={deleteItem}
                      updateItem={updateItem}
                      genres={genres}
                      types={types}
                      status={status}
                      librarySection={librarySection}
                    />
                    <Typography
                      variant="body2"
                      sx={{ width: "200px", fontSize: "20px", mt: 1, fontWeight: "bold", ml: { xs: 1, lg: 0 }, textAlign: { xs: "start", lg: "center" } }}
                    >
                      {libraryElement.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FormModal
        openModal={openCreateModal}
        handleCloseModal={handleCloseCreateModal}
        titleModal="Nouvel élément"
        status={status}
        genres={genres}
        types={types}
        buttonSubmitName="Ajouter"
        onSubmit={createItem}
        librarySection={librarySection}
      />
    </Grid>
  )
}

export default LibraryList;