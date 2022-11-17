import { Box, Typography } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MyComment from './my-comment';
import { useSession } from 'next-auth/react';

interface Props {
  isDownSm?: boolean;
  isDownMd?: boolean;
  username: string;
  movieCode: string;
}

const CommentsSection = ({
  username,
  movieCode,
  isDownMd,
  isDownSm,
}: Props) => {
  const { status } = useSession();
  return (
    <Box
      mt={isDownMd ? (isDownSm ? 5 : 8) : 15}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isDownMd ? 'center' : 'normal',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ChatBubbleIcon
          sx={{
            color: 'white',
            fontSize: isDownMd ? (isDownSm ? '1.2rem' : '1.5rem') : '2rem',
            marginRight: '1rem',
          }}
        />
        <Typography
          sx={{
            fontWeight: 'bolder',
            fontSize: isDownMd ? (isDownSm ? '1.8rem' : '2.2rem') : '2.5rem',
            color: 'white',
          }}
        >
          Comments
        </Typography>
      </Box>

      <Box
        sx={{
          width: isDownMd ? '80%' : '100%',
        }}
      >
        {status === 'authenticated' ? (
          <MyComment
            username={username}
            movieCode={movieCode}
            isDownMd={isDownMd}
          />
        ) : (
          <Typography
            mt={2}
            sx={{
              fontWeight: 'bolder',
              fontSize: isDownMd ? '1.2rem' : '1.5rem',
              color: (theme) => theme.palette.primary.main,
              textAlign: isDownMd ? 'center' : 'start',
            }}
          >
            로그인하고 코멘트를 남겨보세요!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CommentsSection;
