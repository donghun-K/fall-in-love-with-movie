import { signOut } from 'next-auth/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const HomeAuth = () => {
  return (
    <>
      <Typography variant='h1' color='primary'>
        Authenticated
      </Typography>
      <Button
        variant='text'
        color='primary'
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
    </>
  );
};

export default HomeAuth;
