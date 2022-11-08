import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useRouter } from 'next/router';

const DrawerSearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (searchInput === '') {
      return;
    }
    router.replace(`/search/${searchInput}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#333333',
          input: {
            color: (theme) => theme.palette.primary.main,
          },
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search'
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <IconButton type='submit' sx={{ p: '10px' }}>
          <SearchIcon
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          />
        </IconButton>
      </Paper>
    </form>
  );
};

export default DrawerSearchBar;
