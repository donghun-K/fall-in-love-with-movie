import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  useMediaQuery,
} from '@mui/material';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import theme from '../src/theme';

const MyPage = () => {
  const { data: session, status } = useSession();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

  const router = useRouter();

  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (status !== 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);
  return (
    <Box>
      <Head>
        <title>My Page</title>
      </Head>
      <Box mt={10} sx={{ display: 'flex', justifyContent: 'center' }}>
        <List
          sx={{
            width: '80%',
            backgroundColor: '#111111',
            borderRadius: '.5rem',
          }}
          subheader={
            <ListSubheader
              sx={{
                backgroundColor: '#111111',
                borderRadius: '.5rem',
                padding: '2rem',
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontSize: isDownSm ? '1rem' : '1.2rem',
                  fontWeight: 'bolder',
                }}
              >
                <Typography
                  component='span'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontSize: isDownSm ? '1.2rem' : '1.8rem',
                    fontWeight: 'bolder',
                  }}
                >
                  {session?.user?.name}
                </Typography>
                님 좋은 하루 보내세요 :)
              </Typography>
            </ListSubheader>
          }
        >
          <Divider sx={{ backgroundColor: 'gray' }} />
          <ListItemButton
            sx={{
              padding: '1rem',
            }}
            onClick={() => {
              setOpenChangePassword(!openChangePassword);
            }}
          >
            <ListItemIcon>
              <PasswordRoundedIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              sx={{
                '& .MuiListItemText-primary': {
                  color: 'white',
                  fontWeight: 'bolder',
                },
              }}
              primary='비밀번호 변경'
            />
            {openChangePassword ? (
              <ExpandLess sx={{ color: 'white' }} />
            ) : (
              <ExpandMore sx={{ color: 'white' }} />
            )}
          </ListItemButton>
          <Collapse in={openChangePassword} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  sx={{
                    color: 'white',
                  }}
                  primary='추가 예정'
                />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton
            sx={{
              padding: '1rem',
            }}
            onClick={() => {
              setOpenDeleteAccount(!openDeleteAccount);
            }}
          >
            <ListItemIcon>
              <PersonRemoveRoundedIcon sx={{ color: 'red' }} />
            </ListItemIcon>
            <ListItemText
              sx={{
                '& .MuiListItemText-primary': {
                  color: 'red',
                  fontWeight: 'bolder',
                },
              }}
              primary='회원 탈퇴'
            />
            {openDeleteAccount ? (
              <ExpandLess sx={{ color: 'red' }} />
            ) : (
              <ExpandMore sx={{ color: 'red' }} />
            )}
          </ListItemButton>
          <Collapse in={openDeleteAccount} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  sx={{
                    color: 'white',
                  }}
                  primary='추가 예정'
                />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Box>
  );
};

export default MyPage;
