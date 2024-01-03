import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { TListenings, TReadings, TWatchings } from "../../../types";

import "./ModalOfItem.scss";

interface IConfirmModal {
  openModal: boolean
  handleCloseModal: () => void
  handleClose: () => void
  item: TWatchings | TReadings | TListenings
  deleteItem: (id: number) => Promise<void>
}

const ConfirmModal = ({ openModal, handleCloseModal, handleClose, item, deleteItem }: IConfirmModal) => {
  const handleClickDelete = () => {
    item.id && deleteItem(item.id).then(() => {
      handleCloseModal();
      handleClose();
    });
  }

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="ModalGeneral" sx={{ width: "500px" }}>
        <Grid container>
          <Grid item xs={12} className="ModalHeader">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirmer la suppression
            </Typography>
          </Grid>
          <Grid item xs={12} className="ModalBody">
            <Grid container className="ModalButtonsContainer">
              <Grid item xs={12}>
                <Typography>Êtes-vous sur de vouloir supprimer cet élément ?</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleClickDelete}
                  variant="contained"
                  size="small"
                >
                  Supprimer
                </Button>
                <Button
                  onClick={handleCloseModal}
                  variant="outlined"
                  size="small"
                >
                  Annuler
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ConfirmModal;