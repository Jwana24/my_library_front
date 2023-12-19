import { useState } from "react";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { Genre, TListenings, TReadings, TWatchings, Type } from "../../../types";
import ConfirmModal from "./ConfirmModal.tsx";
import UpdateModal from "./UpdateModal.tsx";
import Trash from "../../../assets/poubelle.png";
import Pencil from "../../../assets/crayon.png";

import "./ModalOfItem.scss";

interface IModalOfItem {
  open: boolean
  handleClose: () => void
  item: TWatchings | TReadings | TListenings
  deleteItem: (id: number) => Promise<void>
  updateItem: (id: number, formValues: object) => Promise<void>
  genres: Genre[]
  types: Type[]
  status: Array<{ name: string }>
}

const ModalOfItem = ({ open, handleClose, item, deleteItem, updateItem, genres, types, status }: IModalOfItem) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

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
    <Modal
      open={open}
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
                {`${"saga" in item ? ` (saga)` : ''}`}
                <Typography component="div">
                  {`${"author" in item ? `de ${item.author}` : '' }`}
                  {`${"producer" in item ? `de ${item.producer}` : '' }`}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} className="ModalBody">
              <Grid container>
                <Grid item xs={3}>
                  <img src={item.image} alt={`Affiche ${item.title}`} />
                </Grid>
                <Grid item xs={9}>
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
        <UpdateModal
          openModal={openUpdateModal}
          handleCloseModal={handleCloseUpdateModal}
          item={item}
          updateItem={updateItem}
          genres={genres}
          types={types}
          status={status}
        />
      </>
    </Modal>
  )
}

export default ModalOfItem;