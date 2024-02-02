import { useState } from "react";
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
  import { Genre, TListenings, TReadings, TWatchings, Type } from "../../../types";
  
  interface IFormModal {
    item?: TWatchings | TReadings | TListenings
    openModal: boolean
    handleCloseModal: () => void
    titleModal: string
    status: Array<{ name: string }>
    genres: Genre[]
    types: Type[]
    buttonSubmitName: string
    librarySection: string
    onSubmit: (formValues: object) => Promise<void>
  }
  
  const FormModal = ({
    item,
    openModal,
    handleCloseModal,
    titleModal,
    status,
    genres,
    types,
    buttonSubmitName,
    librarySection,
    onSubmit
  }: IFormModal) => {
    const [statusSelected, setStatusSelected] = useState(item ? item.status : "");
    const [typeId, setTypeId] = useState<number | undefined>(item ? item.type.id : undefined);
    const [author, setAuthor] = useState(["Readings"].includes(librarySection) && item ? (item as TReadings).author : "");
    const [producer, setProducer] = useState(["Watchings"].includes(librarySection) && item ? (item as TWatchings).producer : "");
    const [artist, setArtist] = useState(["Listenings"].includes(librarySection) && item ? (item as TListenings).artist : "");
    const [title, setTitle] = useState(item ? item.title : "");
    const [saga, setSaga] = useState(["Readings", "Watchings"].includes(librarySection) && item ? (item as TReadings | TWatchings).saga : false);
    const [lang, setLang] = useState(["Readings"].includes(librarySection) && item ? (item as TReadings).lang : "");
    const [genreIds, setGenreIds] = useState<number[]>(item ? item.genres.map((genre) => genre.id) : []);
    const [image, setImage] = useState(item ? item.image : "");
    const [summary, setSummary] = useState(["Readings", "Watchings"].includes(librarySection) && item ? (item as TReadings | TWatchings).summary : "");
  
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
  
    const handleClick = () => {
      onSubmit({
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
                {titleModal}
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
                            defaultValue={item ? (item as TReadings).lang : ""}
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
                            defaultValue={item ? (item as TReadings).author : ""}
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
                            defaultValue={item ? (item as TWatchings).producer : ""}
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
                            defaultValue={item ? (item as TListenings).artist : ""}
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
                        defaultValue={item ? item.image : ""}
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
                        defaultValue={item ? item.title : ""}
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
                            defaultValue={item ? (item as TReadings | TWatchings).summary : ""}
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
                <Button onClick={handleClick} variant="contained" size="small">
                  {buttonSubmitName}
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
  
  export default FormModal;