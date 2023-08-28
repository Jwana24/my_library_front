import { Badge, Box, Button, Grid, Modal, Typography } from "@mui/material";
import { TListenings, TReadings, TWatchings } from "../../../types";
import Trash from "../../../assets/poubelle.png";
import Pencil from "../../../assets/crayon.png";

import "./ModalOfItem.scss";

interface IModalOfItem {
  open: boolean
  handleClose: () => void
  item: TWatchings | TReadings | TListenings
}

const ModalOfItem = ({ open, handleClose, item }: IModalOfItem) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="ModalGeneral">
        <Grid container>
          <Grid item xs={12} className="ModalHeader">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {item.title}
            </Typography>
          </Grid>
          <Grid item xs={12} className="ModalBody">
            <Grid container>
              <Grid item xs={3}>
                <img src={item.image} alt={`Affiche ${item.title}`} />
              </Grid>
              <Grid item xs={9}>
                <Typography className="Subtitle">Genre :</Typography>
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
          <Grid item xs={12} className="ModalFooter">
            <Box>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="error"
                size="small"
                startIcon={<img src={Trash} alt="Icône de poubelle" />}
              >
                Supprimer
              </Button>
              <Button
                onClick={handleClose}
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
    </Modal>
  )
}

export default ModalOfItem;