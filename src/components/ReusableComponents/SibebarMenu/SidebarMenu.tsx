import { useState } from "react";
import {
  Accordion, AccordionDetails, AccordionSummary,
  Box,
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem, TextField,
  Typography
} from "@mui/material";
import { isMobile } from "react-device-detect";
import { Select, SelectChangeEvent } from "@mui/material";
import { Type } from "../../../types";
import Plus from "../../../assets/plus.png";
import ArrowDown from "../../../assets/arrow-down.png";
import "./SidebarMenu.scss";

interface ISidebarMenu {
  getIconForEachType: (type: Type) => string
  selectedType: string
  setSelectedType: React.Dispatch<React.SetStateAction<string>>
  types: Type[]
  createGenre: (genreName: string, typeId: number) => Promise<void>
}

interface IStaticContentOfAddingGenres {
  isMobile: boolean
  handleChangeGenre: (event: React.ChangeEvent<HTMLInputElement>) => void
  typeId: number | undefined
  handleChangeTypeOfGenre: (event: SelectChangeEvent<number | undefined>) => void
  types: Type[]
  handleClickAddGenre: () => void
}

const StaticContentOfAddingGenres = ({ isMobile, handleChangeGenre, typeId, handleChangeTypeOfGenre, types, handleClickAddGenre }: IStaticContentOfAddingGenres) => {
  return (
    <Box className="ContainerOfGenres">
      <Grid container>
        <Grid item xs={12} pb={2}>
          {!isMobile && <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>Ajouter un genre :</Typography>}
          <TextField
            onChange={handleChangeGenre}
            variant="outlined"
            size="small"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <Typography sx={{ fontWeight: "bold", fontSize: "16px", marginBottom: "5px" }}>pour</Typography>
          <Select size="small" value={typeId} onChange={handleChangeTypeOfGenre} fullWidth>
            {types.map((type) => (
              <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
            ))}
          </Select>
          <Button
            onClick={handleClickAddGenre}
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<img src={Plus} style={{ width: "17px" }} alt="Icône d'un plus encerclé" />}
            sx={{ marginTop: "10px", textTransform: "none" }}
          >
            Ajouter
          </Button>
        </Grid>
        <Grid item xs={12} className="ListOfGenres" pt={2}>
          <Typography sx={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>Liste des genres :</Typography>
          {types.map((type: Type) => (
            <Box key={type.id} className="ContainerNameOfTypes">
              <Typography className="NameOfTypes">{type.name}</Typography>
              {type.genres && type.genres.map((genre) => (
                <Typography key={genre.id} className="NameOfGenres">{genre.name}</Typography>
              ))}
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

const SidebarMenu = ({ getIconForEachType, selectedType, setSelectedType, types, createGenre }: ISidebarMenu) => {
  const [genre, setGenre] = useState<string>("");
  const [typeId, setTypeId] = useState<number | undefined>();
  const handleOnClickTab = (type: string) => () => {
    setSelectedType(type);
  };

  const handleChangeType = (event: SelectChangeEvent<typeof selectedType>) => {
    setSelectedType(event.target.value as string);
  }

  const handleChangeTypeOfGenre = (event: SelectChangeEvent<typeof typeId>) => {
    setTypeId(event.target.value as number);
  }

  const handleChangeGenre = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(event.target.value);
  }

  const handleClickAddGenre = () => {
    typeId && createGenre(genre, typeId);
  }

  if (isMobile) {
    return (
      <>
        <Grid item xs={12}>
          <Select displayEmpty size="small" value={selectedType} onChange={handleChangeType} fullWidth>
            <MenuItem value=""><em>Tous les types</em></MenuItem>
            {types.map((type) => (
              <div className="SelectMobile" key={type.id}>
                <MenuItem key={type.id} value={type.name}>
                  <ListItemIcon>
                    <img src={getIconForEachType(type)} alt={`Icône ${type?.name}`}/>
                  </ListItemIcon>
                  <ListItemText>{type.name}</ListItemText>
                </MenuItem>
              </div>
            ))}
          </Select>
        </Grid>
        <Accordion disableGutters sx={{ marginTop: "16px", '&:before': { display: 'none' } }}>
          <AccordionSummary
            expandIcon={<img src={ArrowDown} style={{ width: "17px" }} alt="Icône d'une flèche allant vers le bas" />}
            aria-controls="panel1-content"
          >
            <Typography>Ajouter un genre</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StaticContentOfAddingGenres
              isMobile={isMobile}
              handleChangeGenre={handleChangeGenre}
              typeId={typeId}
              handleChangeTypeOfGenre={handleChangeTypeOfGenre}
              types={types}
              handleClickAddGenre={handleClickAddGenre}
            />
          </AccordionDetails>
        </Accordion>
      </>
    )
  }

  return (
    <>
      <List className="ListOfTypes">
        <ListItemButton
          onClick={handleOnClickTab("")}
          selected={"" === selectedType}
          className="MenuGrid"
        >
          <ListItemText primary="Tous les types" sx={{ fontStyle: "italic" }} />
        </ListItemButton>
        {types.map((type) => (
          <ListItemButton
            key={type.id}
            onClick={handleOnClickTab(type.name!)}
            selected={type.name === selectedType}
            className="MenuGrid"
          >
            <ListItemIcon>
              <img src={getIconForEachType(type)} alt={`Icône ${type?.name}`} />
            </ListItemIcon>
            <ListItemText primary={type?.name} />
          </ListItemButton>
        ))}
      </List>
      <StaticContentOfAddingGenres
        isMobile={isMobile}
        handleChangeGenre={handleChangeGenre}
        typeId={typeId}
        handleChangeTypeOfGenre={handleChangeTypeOfGenre}
        types={types}
        handleClickAddGenre={handleClickAddGenre}
      />
    </>
  )
}

export default SidebarMenu;