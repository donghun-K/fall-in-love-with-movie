import { Box, Rating, TextField, Typography } from '@mui/material';

interface Props {
  isDownSm?: boolean;
  isDownMd?: boolean;
  username: string;
  rating: number | undefined;
  comment: string;
  date: string;
}

const Comment = ({
  username,
  rating,
  comment,
  date,
  isDownMd,
  isDownSm,
}: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: '#111111',
        padding: '1rem',
        borderRadius: '.8rem',
        margin: isDownSm ? '1rem 0' : '2rem 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: isDownMd ? '1.2rem' : '1.5rem',
            fontWeight: 'bolder',
            color: 'white',
          }}
        >
          {username}
        </Typography>
        {rating !== undefined && (
          <Rating
            sx={{
              marginLeft: '1rem',
              fontSize: isDownMd ? '1.2rem' : '1.5rem',
              '& .MuiRating-icon': {
                color: (theme) => theme.palette.primary.main,
              },
            }}
            value={rating}
            readOnly
          />
        )}
      </Box>
      <Typography
        sx={{
          fontSize: isDownMd ? '.6rem' : '.8rem',
          color: 'gray',
        }}
        mb={isDownSm ? 0 : 1}
      >
        {date}
      </Typography>
      <Box
        sx={{
          maxHeight: '100px',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'lightgray',
            backgroundClip: 'padding-box',
            border: '2px solid transparent',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#222222',
            borderRadius: '10px',
          },
        }}
      >
        <TextField
          sx={{
            '& .MuiInput-root:before': {
              borderBottomColor: 'transparent',
            },
            textarea: {
              fontSize: isDownMd ? '1rem' : '1.2rem',
              color: 'lightgray',
              padding: '.5rem 0',
            },
            pointerEvents: 'none',
          }}
          fullWidth
          multiline
          variant='standard'
          size='medium'
          value={comment}
        />
      </Box>
    </Box>
  );
};

export default Comment;
