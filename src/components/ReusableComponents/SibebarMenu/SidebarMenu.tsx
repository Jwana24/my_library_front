import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Type } from "../../../types";
import "./SidebarMenu.scss";

interface ISidebarMenu {
  getIconForEachType: (type: Type) => string
  selectedType: string
  setSelectedType: React.Dispatch<React.SetStateAction<string>>
  types: Type[]
}

const SidebarMenu = ({ getIconForEachType, selectedType, setSelectedType, types }: ISidebarMenu) => {
  const handleOnClickTab = (type: string) => (event: React.MouseEvent<HTMLElement>) => {
    setSelectedType(type);
  };

  return (
    <List className="ListOfTypes">
      <ListItemButton
        onClick={handleOnClickTab("")}
        selected={"" === selectedType}
        className="MenuGrid"
      >
        <ListItemText primary="Tout afficher" />
      </ListItemButton>
      {types.map((type) => (
        <ListItemButton
          key={type.id}
          onClick={handleOnClickTab(type.name)}
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