import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { TListenings, TReadings, TWatchings } from "../../../types";

import "./ModalOfItem.scss";

interface IModalOfItem {
  openNestedModal: boolean
  handleCloseNestedModal: () => void
  handleClose: () => void
  item: TWatchings | TReadings | TListenings
  deleteItem: (id: number) => Promise<void>
}

const ConfirmModal = ({ openNestedModal, handleCloseNestedModal, handleClose, item, deleteItem }: IModalOfItem) => {
  const handleClickDelete = () => {
    deleteItem(item.id).then(() => {
      handleCloseNestedModal();
      handleClose();
    });
  }

  return (
    <Modal
      open={openNestedModal}
      onClose={handleCloseNestedModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="ModalGeneral" sx={{ width: "500px" }}>
        <Grid container>
          <Grid item xs={12} className="ModalHeader">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirmer
            </Typography>
          </Grid>
          <Grid item xs={12} className="ModalBody">
            <Grid container className="ModalButtonsContainer">
              <Grid item xs={12}>
                <Typography>Confirmer ?</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleClickDelete}
                  variant="contained"
                  size="small"
                >
                  Oui
                </Button>
                <Button
                  onClick={handleCloseNestedModal}
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