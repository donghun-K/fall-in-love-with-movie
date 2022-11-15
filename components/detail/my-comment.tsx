import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  isDownSm?: boolean;
  isDownMd?: boolean;
  username: string;
  movieCode: string;
}

const MyComment = ({ username, movieCode }: Props) => {
  const [comment, setComment] = useState<string>('');

  const postComment = async ({
    username,
    movieCode,
    comment,
  }: {
    username: string | undefined | null;
    movieCode: string;
    comment: string;
  }) => {
    const response = await axios.post('/api/detail/comment', {
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
    const response = await axios.get('/api/detail/comment', {
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
  };

  useEffect(() => {
    getComment({ username, movieCode }).then((res) => {
      setComment(res.data.comment);
    });
  }, [username, movieCode]);

  return (
    <Box mt={5}>
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
              fontSize: '1.2rem',
              color: 'white',
              '&::placeholder': {
                color: 'white',
              },
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
    </Box>
  );
};

export default MyComment;
