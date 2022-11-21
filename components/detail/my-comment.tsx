import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  isDownSm?: boolean;
  isDownMd?: boolean;
  username: string;
  movieCode: string;
}

const MyComment = ({ username, movieCode, isDownMd }: Props) => {
  const [comment, setComment] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isEdit, setIsEdit] = useState(true);

  const postComment = async ({
    username,
    movieCode,
    comment,
  }: {
    username: string | undefined | null;
    movieCode: string;
    comment: string;
  }) => {
    const response = await axios.post('/api/detail/mycomment', {
      username,
      movieCode,
      comment,
    });
  };

  const getComment = async ({
    username,
    movieCode,
  }: {
    username: string;
    movieCode: string;
  }) => {
    const response = await axios.get('/api/detail/mycomment', {
      params: { username, movieCode },
    });
    return response;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (comment.trim() === '') {
      alert('내용을 입력해주세요!');
      return;
    }
    await postComment({ username, movieCode, comment });
    setIsEdit(false);
  };

  useEffect(() => {
    getComment({ username, movieCode }).then((res) => {
      setComment(res.data.comment);
      if (res.data.comment !== undefined) {
        setIsEdit(false);
      }
      setDate(res.data.date);
    });
  }, [username, movieCode]);

  return (
    <Box mt={isDownMd ? 2 : 5}>
      {isEdit ? (
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{
              '& .MuiInput-root:before': {
                borderBottomColor: 'white',
              },
              '& .MuiInputBase-root:hover:not(.Mui-diabled):before': {
                borderBottomColor: 'white',
              },
              textarea: {
                fontSize: isDownMd ? '1rem' : '1.2rem',
                color: 'white',
                '&::placeholder': {
                  color: 'white',
                },
                padding: '.5rem 0',
              },
            }}
            fullWidth
            multiline
            placeholder='이 영화에 대한 감상을 남겨보세요.'
            variant='standard'
            size='medium'
            value={comment}
            onChange={(e) => {
              if (e.target.value !== '') {
                setComment(e.target.value);
              } else {
                setComment('');
              }
              setComment(e.target.value);
            }}
          />

          <Box
            mt={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button type='submit' variant='outlined' size='large'>
              등록
            </Button>
          </Box>
        </form>
      ) : (
        <Box>
          <Typography
            sx={{
              fontSize: isDownMd ? '1.2rem' : '1.5rem',
              fontWeight: 'bolder',
              color: (theme) => theme.palette.primary.main,
            }}
          >
            My Comment
          </Typography>
          <Typography
            sx={{
              fontSize: isDownMd ? '.6rem' : '.8rem',
              color: 'gray',
            }}
            mb={2}
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
                backgroundColor: '#111111',
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
              onChange={(e) => {
                if (e.target.value !== '') {
                  setComment(e.target.value);
                } else {
                  setComment('');
                }
                setComment(e.target.value);
              }}
            />
          </Box>
          <Box
            mt={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant='outlined'
              size={isDownMd ? 'medium' : 'large'}
              onClick={() => {
                setIsEdit(true);
              }}
            >
              수정
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MyComment;
