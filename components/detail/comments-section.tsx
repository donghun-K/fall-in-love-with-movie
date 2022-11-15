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
    <Box mt={5}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ChatBubbleIcon
          sx={{
            color: 'white',
            fontSize: '2rem',
            marginRight: '1rem',
          }}
        />
        <Typography
          sx={{
            fontWeight: 'bolder',
            fontSize: '2.5rem',
            color: 'white',
          }}
        >
          Comments
        </Typography>
      </Box>

      <Box>
        <MyComment username={username} movieCode={movieCode} />
      </Box>
    </Box>
  );
};

export default CommentsSection;
