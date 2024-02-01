import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Modal,
  Select, SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { Genre, Type } from "../../../types";

interface ICreateModal {
  openModal: boolean
  handleCloseModal: () => void
  selectedType: string
  status: Array<{ name: string }>
  types: Type[]
  genres: Genre[]
  librarySection: string
  createItem: (formValues: object) => Promise<void>
}

const CreateModal = ({ openModal, handleCloseModal, status, types, genres, librarySection, createItem }: ICreateModal) => {
  const [statusSelected, setStatusSelected] = useState("");
  const [typeId, setTypeId] = useState<number>();
  const [author, setAuthor] = useState("");
  const [producer, setProducer] = useState("");
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [saga, setSaga] = useState(false);
  const [lang, setLang] = useState("");
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusSelected(event.target.value);
  }

  const handleChangeType = (event: SelectChangeEvent<typeof typeId>) => {
    setTypeId(event.target.value as number);
  }

  const handleChangeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  }

  const handleChangeProducer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProducer(event.target.value);
  }

  const handleChangeArtist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(event.target.value);
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const handleChangeSaga = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaga(event.target.checked);
  }

  const handleChangeLang = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.value);
  }

  const handleChangeGenre = (event: SelectChangeEvent<typeof genreIds>) => {
    setGenreIds(event.target.value as number[]);
  }

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  }

  const handleChangeSummary = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(event.target.value);
  }

  const handleClickCreate = () => {
    createItem({
      status: statusSelected,
      typeId: typeId,
      author: author,
      producer: producer,
      artist: artist,
      title: title,
      saga: saga,
      lang: lang,
      genreIds: genreIds,
      image: image,
      summary: summary
    }).then(() => {
      handleCloseModal();
    });
  }

  return(
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
              Nouvel élément
            </Typography>
          </Grid>
          <Grid item xs={12} className="ModalBody">
            <Grid container justifyContent="space-between">
              {["Readings", "Watchings"].includes(librarySection) && (
                <>
                  <Grid item xs={5}>
                    <Grid container>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox checked={saga} onChange={handleChangeSaga} />
                          }
                          label="Est-ce une saga ?"
                          labelPlacement="start"
                          sx={{ m: 0 }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              {["Readings"].includes(librarySection) && (
                <>
                  <Grid item xs={5}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography>Langue</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={handleChangeLang}
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={12} mt={1}>
                        <Typography>Auteur</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={handleChangeAuthor}
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              {["Watchings"].includes(librarySection) && (
                <>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={12} mt={1}>
                        <Typography>Producteur</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={handleChangeProducer}
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              {["Listenings"].includes(librarySection) && (
                <>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={12} mt={1}>
                        <Typography>Artiste / groupe</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={handleChangeArtist}
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              <Grid item xs={5}>
                <Grid container>
                  <Grid item xs={12} mt={1}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Select size="small" value={statusSelected} onChange={handleChangeStatus} fullWidth>
                      {status.map((statusSelected, index) => (
                        <MenuItem key={index} value={statusSelected.name}>{statusSelected.name}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12} mt={2}>
                    <Typography>Lien de l'image</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
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
                  <Grid item xs={12} mt={2}>
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

              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={12} mt={2}>
                    <Typography>Titre</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChangeTitle}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={12} mt={2}>
                    <Typography>Type</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Select size="small" value={typeId} onChange={handleChangeType} fullWidth>
                      {types.map((type) => (
                        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>

              {["Readings", "Watchings"].includes(librarySection) && (
                <>
                  <Grid item xs={12} mt={2}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography>Résumé</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
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
                </>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} className="ModalFooter ModalButtonsContainer">
            <Box>
              <Button onClick={handleClickCreate} variant="contained" size="small">
                Ajouter
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

export default CreateModal;