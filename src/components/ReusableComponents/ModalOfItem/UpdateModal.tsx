import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox, FormControlLabel,
  Grid,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import { Genre, TListenings, TReadings, TWatchings, Type } from "../../../types";

interface IUpdateModal {
  openModal: boolean
  handleCloseModal: () => void
  item: TWatchings | TReadings | TListenings
  updateItem: (id: number, formValues: object) => Promise<void>
  genres: Genre[]
  types: Type[]
  status: Array<{ name: string }>
}

const UpdateModal = ({ openModal, handleCloseModal, item, updateItem, genres, types, status }: IUpdateModal) => {
  const [statusSelected, setStatusSelected] = useState(item.status);
  const [typeId, setTypeId] = useState<number>(item.type.id);
  const [author, setAuthor] = useState("author" in item ? item.author : undefined);
  const [producer, setProducer] = useState("producer" in item ? item.producer : undefined);
  const [title, setTitle] = useState(item.title);
  const [saga, setSaga] = useState("saga" in item ? item.saga : undefined);
  const [lang, setLang] = useState("lang" in item ? item.lang : undefined);
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [image, setImage] = useState(item.image);
  const [summary, setSummary] = useState("summary" in item ? item.summary : undefined);

  useEffect(() => {
    setGenreIds(item.genres.map((genre) => genre.id));
  }, [item]);

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusSelected(event.target.value);
  }

  const handleChangeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  }

  const handleChangeProducer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProducer(event.target.value);
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

  const handleChangeType = (event: SelectChangeEvent<typeof typeId>) => {
    setTypeId(event.target.value as number);
  }

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  }

  const handleChangeSummary = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(event.target.value);
  }

  const handleClickUpdate = () => {
    item.id && updateItem(item.id, {
      status: statusSelected,
      author: author,
      producer: producer,
      title: title,
      saga: saga,
      lang: lang,
      genreIds: genreIds,
      image: image,
      summary: summary,
      typeId: typeId
    }).then(() => {
      handleCloseModal();
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
              {"saga" in item && (
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
              )}
              {"lang" in item && (
                <Grid item xs={5}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography>Langue</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        defaultValue={item.lang}
                        onChange={handleChangeLang}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {"author" in item && (
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={12} mt={1}>
                      <Typography>Auteur</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        defaultValue={item.author}
                        onChange={handleChangeAuthor}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {"producer" in item && (
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={12} mt={1}>
                      <Typography>Producteur</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        defaultValue={item.producer}
                        onChange={handleChangeProducer}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={5}>
                <Grid container>
                  <Grid item xs={12} mt={2}>
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
                      defaultValue={item.title}
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
                    <Typography>Type de lecture</Typography>
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