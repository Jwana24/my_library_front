import { useState } from "react";
import { Box, Button, Card, CardActionArea, CardContent, Grid, Modal, Typography } from "@mui/material";
import { Genre, TListenings, TReadings, TWatchings, Type } from "../../../types";
import ConfirmModal from "./ConfirmModal";
import FormModal from "./FormModal";
import Trash from "../../../assets/poubelle.png";
import Pencil from "../../../assets/crayon.png";

import "./ModalOfItem.scss";

interface IModalOfItem {
  item: TWatchings | TReadings | TListenings
  deleteItem: (id: number) => Promise<void>
  updateItem: (id?: number) => (formValues: object) => Promise<void>
  genres: Genre[]
  types: Type[]
  status: Array<{ name: string }>
  librarySection: string
}

const ModalOfItem = ({ item, deleteItem, updateItem, genres, types, status, librarySection}: IModalOfItem) => {
  const [openCardItem, setOpenCardItem] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleOpen = () => setOpenCardItem(true);
  const handleClose = () => setOpenCardItem(false);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const handleClickDelete = () => {
    handleOpenDeleteModal();
  }

  const handleClickUpdate = () => {
    handleOpenUpdateModal();
  }

  return (
    <>
      {/* The card of the item */}
      <Card className="Card">
        <CardActionArea onClick={() => handleOpen()} sx={{ height: '100%' }}>
          <CardContent>
            <div className="ImageContainer">
              <img src={item.image} alt={`Affiche ${item.title}`} />
            </div>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* The modal of the card item */}
      <Modal
        open={openCardItem}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box className="ModalGeneral">
            <Grid container>
              <Grid item xs={12} className="ModalHeader">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {item.title}
                  {`${"saga" in item && item.saga ? ` (saga)` : ''}`}
                  <Typography component="div">
                    {`${"author" in item ? `de ${item.author}` : '' }`}
                    {`${"producer" in item ? `de ${item.producer}` : '' }`}
                    {`${"artist" in item ? `de ${item.artist}` : '' }`}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} className="ModalBody">
                <Grid container>
                  <Grid item xs={12} sm={3} className="ImageItem">
                    <Grid container>
                      <Grid item xs={12} sx={{ display: { xs: "flex", lg: "block" }, justifyContent: { xs: "center", lg: "initial" } }}>
                        <img src={item.image} alt={`Affiche ${item.title}`} />
                      </Grid>
                      {["Lu", "Vu", "Ecouté"].includes(item.status) && (
                        <Grid item xs={12} sx={{ mt: 1, mb: 1, display: "flex", justifyContent: { xs: "center", lg: "initial" } }}>
                          <Typography className="Subtitle">Note :</Typography>
                          <Typography sx={{ fontWeight: 'bold', fontSize: '16px', ml: 1 }}>{item.rating}/10</Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={9}  className="InfosItem">
                    <>
                      <Typography className="Subtitle">Statut :</Typography>
                      <Typography>{item.status}</Typography>
                    </>
                    <>
                      <Typography className="Subtitle">Type :</Typography>
                      <Typography>{item.type.name}</Typography>
                    </>
                    {"lang" in item && (
                      <>
                        <Typography className="Subtitle">Langue :</Typography>
                        <Typography>{item.lang}</Typography>
                      </>
                    )}
                    <Typography className="Subtitle">Genre(s) :</Typography>
                    {item.genres.map((genre) => (
                      <Typography key={genre.id}>{genre.name}</Typography>
                    ))}
                    {"summary" in item && (
                      <>
                        <Typography className="Subtitle">Résumé :</Typography>
                        <Typography>{item.summary}</Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="ModalFooter ModalButtonsContainer">
                <Box>
                  <Button
                    onClick={handleClickDelete}
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<img src={Trash} alt="Icône de poubelle" />}
                  >
                    Supprimer
                  </Button>
                  <Button
                    onClick={handleClickUpdate}
                    variant="contained"
                    color="success"
                    size="small"
                    startIcon={<img src={Pencil} alt="Icône de crayon" />}
                  >
                    Modifier
                  </Button>
                </Box>
                <Box>
                  <Button onClick={handleClose} variant="outlined" color="primary" size="small">Fermer</Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <ConfirmModal
            openModal={openDeleteModal}
            handleCloseModal={handleCloseDeleteModal}
            handleClose={handleClose}
            item={item}
            deleteItem={deleteItem}
          />
          <FormModal
            item={item}
            openModal={openUpdateModal}
            handleCloseModal={handleCloseUpdateModal}
            titleModal={`Mise à jour de ${item.title}`}
            status={status}
            genres={genres}
            types={types}
            buttonSubmitName="Mettre à jour"
            onSubmit={updateItem(item.id)}
            librarySection={librarySection}
          />
        </>
      </Modal>
    </>
  )
}

export default ModalOfItem;