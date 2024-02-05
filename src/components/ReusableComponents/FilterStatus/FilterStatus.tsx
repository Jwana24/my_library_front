import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

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
    <Select
      value={selectedStatus}
      onChange={handleChangeStatus}
      displayEmpty
      size="small"
      inputProps={{ 'aria-label': 'Without label' }}
      sx={{ minWidth: 120 }}
      fullWidth
    >
      <MenuItem value=""><em>Tous les status</em></MenuItem>
      {status.map((st, index) => (
        <MenuItem key={index} value={st.name}>{st.name}</MenuItem>
      ))}
    </Select>
  )
}

export default FilterStatus;