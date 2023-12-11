import { useEffect, useState } from "react";
import { Box, Button, Grid, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Genre, TListenings, TReadings, TWatchings } from "../../../types";

interface IUpdateModal {
  openModal: boolean
  handleCloseModal: () => void
  handleClose: () => void
  item: TWatchings | TReadings | TListenings
  updateItem: (id: number, formValues: object) => Promise<void>
  genres: Genre[]
}

const UpdateModal = ({ openModal, handleCloseModal, handleClose, item, updateItem, genres }: IUpdateModal) => {
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [image, setImage] = useState(item.image);
  const [summary, setSummary] = useState("summary" in item ? item.summary: null);

  useEffect(() => {
    setGenreIds(item.genres.map((genre) => genre.id));
  }, [item]);

  // console.log(item)

  const handleChangeGenre = (event: SelectChangeEvent<typeof genreIds>) => {
    setGenreIds(event.target.value as number[]);
  }

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  }

  const handleChangeSummary = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(event.target.value);
  }

  const handleClickUpdate = () => {
    item.id && updateItem(item.id, {
      genreIds: genreIds,
      image: image,
      summary: summary
    }).then(() => {
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
      <Box className="ModalGeneral" sx={{ width: "800px" }}>
        <Grid container>
          <Grid item xs={12} className="ModalHeader">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Mise à jour de {item.title}
            </Typography>
          </Grid>
          <Grid item xs={12} className="ModalBody">
            <Grid container justifyContent="space-between">
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography>Lien de l'image</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={item.image}
                      onChange={handleChangeImage}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography>Genre(s)</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Select size="small" value={genreIds} onChange={handleChangeGenre} fullWidth multiple>
                      {genres.map((genre) => (
                        <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              {"summary" in item && (
                <Grid item xs={12} mt={2}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography>Résumé</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        defaultValue={item.summary}
                        onChange={handleChangeSummary}
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        rows={6}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} className="ModalFooter ModalButtonsContainer">
            <Box>
              <Button onClick={handleClickUpdate} variant="contained" size="small">
                Mettre à jour
              </Button>
              <Button onClick={handleCloseModal} variant="outlined" size="small">
                Annuler
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default UpdateModal;