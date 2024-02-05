import { ChangeEvent } from "react";
import { InputAdornment, OutlinedInput } from "@mui/material";
import MGlass from "../../../assets/mglass.png";

interface ISearchBarTitle {
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>
  searchTitle: string
}

const SearchBarTitle = ({ setSearchTitle, searchTitle }: ISearchBarTitle) => {
  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  return (
    <OutlinedInput
      id="outlined-adornment-weight"
      placeholder="Titre à rechercher"
      defaultValue={searchTitle}
      onChange={handleChangeTitle}
      endAdornment={
        <InputAdornment position="end">
          <img src={MGlass} style={{ width: "22px" }} alt="Icône d'une loupe de recherche" />
        </InputAdornment>
      }
      size="small"
      aria-describedby="outlined-weight-helper-text"
      inputProps={{ 'aria-label': 'weight' }}
      sx={{ minWidth: '25ch' }}
      fullWidth
    />
  )
}

export default SearchBarTitle;