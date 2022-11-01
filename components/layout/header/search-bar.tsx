import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, InputBase, Paper } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const SearchBar = () => {
  const [textFieldFocused, setTextFieldFocused] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const router = useRouter();

  const focusedPaperSx = textFieldFocused
    ? {
        backgroundColor: 'secondary.main',
        width: 250,
      }
    : {};

  const paperSx = {
    backgroundColor: 'secondary.dark',
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 50,
    width: 180,
    mr: '20px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: 'secondary.main',
      width: 250,
    },
    ...focusedPaperSx,
  };

  const search = async () => {
    if (searchInput === '') {
      return;
    }
    router.replace(`/search/${searchInput}`);
  };

  return (
    <Paper component='form' sx={paperSx}>
      <InputBase
        sx={{
          ml: 1,
          color: 'primary.light',
        }}
        onFocus={() => setTextFieldFocused(true)}
        onBlur={() => setTextFieldFocused(false)}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
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
        onClick={async () => {
          search();
        }}
      >
        <SearchRoundedIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
