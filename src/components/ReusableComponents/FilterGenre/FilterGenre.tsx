import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Genre } from "../../../types";

interface IFilterGenre {
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>
  selectedGenre: string
  genres: Genre[]
  selectedType: string
}

const FilterGenre = ({ setSelectedGenre, selectedGenre, genres, selectedType }: IFilterGenre) => {
  const handleChangeGenre = (event: SelectChangeEvent) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <Select
      value={selectedGenre}
      onChange={handleChangeGenre}
      displayEmpty
      size="small"
      inputProps={{ 'aria-label': 'Without label' }}
      sx={{ minWidth: 120 }}
      fullWidth
    >
      <MenuItem value="">
        <em>Tous les genres</em>
      </MenuItem>
      {genres.map((genre) => (
        genre?.type?.name === selectedType && (
          <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
        )
      ))}
    </Select>
  )
}

export default FilterGenre;