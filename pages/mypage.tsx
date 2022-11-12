import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MyPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== 'authenticated') {
      alert('Sign In First!');
      router.replace('/auth');
    }
  }, [status, router]);
  return (
    <Box>
      <Typography mt={2} variant='h3' color='primary'>
        Username : {session?.user?.name}
      </Typography>
    </Box>
  );
};

export default MyPage;
