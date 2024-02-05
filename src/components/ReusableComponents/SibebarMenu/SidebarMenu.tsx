import { Grid, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { isMobile } from "react-device-detect";
import { Select, SelectChangeEvent } from "@mui/material";
import { Type } from "../../../types";
import "./SidebarMenu.scss";

interface ISidebarMenu {
  getIconForEachType: (type: Type) => string
  selectedType: string
  setSelectedType: React.Dispatch<React.SetStateAction<string>>
  types: Type[]
}

const SidebarMenu = ({ getIconForEachType, selectedType, setSelectedType, types }: ISidebarMenu) => {
  const handleOnClickTab = (type: string) => () => {
    setSelectedType(type);
  };

  const handleChangeType = (event: SelectChangeEvent<typeof selectedType>) => {
    setSelectedType(event.target.value as string);
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
      </>
    )
  }

  return (
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
  )
}

export default SidebarMenu;