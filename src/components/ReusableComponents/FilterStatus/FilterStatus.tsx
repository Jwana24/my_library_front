import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface IFilterStatus {
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  status: Array<{ name: string }>
}

const FilterStatus = ({ setSelectedStatus, selectedStatus, status }: IFilterStatus) => {
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <FormControl sx={{ mr: 1, minWidth: 120 }} size="small">
      <Select
        value={selectedStatus}
        onChange={handleChangeStatus}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          <em>Tous les status</em>
        </MenuItem>
        {status.map((st, index) => (
          <MenuItem key={index} value={st.name}>{st.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FilterStatus;