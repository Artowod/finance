import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import expenceJson from '../../../data/expenselcon.json';
import incomesJson from '../../../data/incomeIcon.json';
import { useLocation } from 'react-router';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 20,
    position: 'relative',
    backgroundColor: 'red',
    border: '20px solid #ced4da',
    width: 30,
    height: '40px',
    margin: 0,
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const SelectCustome = () => {
  const [age, setAge] = React.useState('');
  const handleChange = event => {
    setAge(event.target.value);
  };
  let isSpend = '';
  const { pathname } = useLocation();
  pathname === '/spend' ? (isSpend = true) : (isSpend = false);
  let data = '';
  let categoryName = '';
  let textInputName = '';
  isSpend ? (data = expenceJson) : (data = incomesJson);
  isSpend ? (categoryName = 'Категория товара') : (categoryName = 'Категория дохода');
  isSpend ? (textInputName = 'Описание товара') : (textInputName = 'Описание дохода');
  return (
    <div>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="demo-customized-select-label">Age</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {data.map(item => {
            return (
              <MenuItem key={item.id} value={item.label}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCustome;
