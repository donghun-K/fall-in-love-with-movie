import { Box, Typography } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MyComment from './my-comment';

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
  return (
    <Box
      mt={isDownMd ? 10 : 15}
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
            fontSize: isDownMd ? '1.2rem' : '2rem',
            marginRight: '1rem',
          }}
        />
        <Typography
          sx={{
            fontWeight: 'bolder',
            fontSize: isDownMd ? '1.8rem' : '2.5rem',
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
        <MyComment
          username={username}
          movieCode={movieCode}
          isDownMd={isDownMd}
        />
      </Box>
    </Box>
  );
};

export default CommentsSection;
