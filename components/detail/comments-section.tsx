import { Box, Typography } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MyComment from './my-comment';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Comment from './comment';

interface Props {
  isDownSm?: boolean;
  isDownMd?: boolean;
  username: string;
  movieCode: string;
}

interface CommentData {
  movieCode: string;
  username: string;
  comment: string;
  rating?: number;
  date: string;
}

const CommentsSection = ({
  username,
  movieCode,
  isDownMd,
  isDownSm,
}: Props) => {
  const { status } = useSession();
  const [commentDatas, setCommentDatas] = useState<CommentData[]>();

  const getComments = async ({
    movieCode,
    username,
  }: {
    movieCode: string;
    username: string;
  }) => {
    const response = await axios.get('/api/detail/comments', {
      params: { movieCode, username },
    });
    console.log(response.data);
    return response;
  };

  useEffect(() => {
    getComments({ movieCode, username }).then((res) => {
      setCommentDatas(res.data.datas);
    });
  }, [movieCode, username]);

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
        {commentDatas?.map((commentData, i) => (
          <Comment
            username={commentData.username}
            rating={commentData.rating}
            comment={commentData.comment}
            date={commentData.date}
            isDownMd={isDownMd}
            isDownSm={isDownSm}
            key={i}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CommentsSection;
