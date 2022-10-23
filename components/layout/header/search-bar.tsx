import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, InputBase, Paper } from '@mui/material';
import { useState } from 'react';

const SearchBar = () => {
  const [textFieldFocused, setTextFieldFocused] = useState(false);

  const focusSx = textFieldFocused
    ? {
        backgroundColor: 'secondary.main',
        width: 250,
      }
    : {};
  return (
    <Paper
      component='form'
      sx={{
        backgroundColor: 'secondary.dark',
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 180,
        mr: '20px',
        transition: '0.3s',
        '&:hover': {
          backgroundColor: 'secondary.main',
          width: 250,
        },
        ...focusSx,
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          color: 'primary.light',
        }}
        onFocus={() => setTextFieldFocused(true)}
        onBlur={() => setTextFieldFocused(false)}
        placeholder='Search'
      />
      <IconButton
        type='button'
        sx={{
          color: 'primary.dark',
          p: '10px',
          '&:hover': {
            color: 'primary.light',
          },
        }}
      >
        <SearchRoundedIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
