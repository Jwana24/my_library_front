import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Genre } from "../../../types";

interface IFilterGenre {
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>
  selectedGenre: string
  genres: Genre[]
}

const FilterGenre = ({ setSelectedGenre, selectedGenre, genres }: IFilterGenre) => {
  const handleChangeGenre = (event: SelectChangeEvent) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <FormControl sx={{ mr: 1, minWidth: 120 }} size="small">
      <Select
        value={selectedGenre}
        onChange={handleChangeGenre}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          <em>Tous les genres</em>
        </MenuItem>
        {genres.map((genre) => (
          <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FilterGenre;