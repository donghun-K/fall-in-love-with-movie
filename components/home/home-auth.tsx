import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Backdrop, Box, CircularProgress, useMediaQuery } from '@mui/material';
import MovieCard from '../../components/search/movie-card';
import theme from '../../src/theme';

interface Data {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

const getMovieData = async () => {
  const response = await axios.post('/api/now');
  const data = response.data.data;
  return data;
};

const HomeAuth = () => {
  const [movieData, setMovieData] = useState<Data[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMovieData().then((res) => {
      setMovieData(res.results);
    });
  }, []);
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        mt={isDownSm ? 2 : 4}
        mb={isDownSm ? 0 : 2}
      >
        <Typography
          sx={{
            color: 'white',
            lineHeight: isDownSm ? '1.5rem' : '2rem',
            fontSize: isDownSm ? '1.5rem' : '2rem',
            fontWeight: 'bolder',
          }}
        >
          상영 중인 영화
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
      >
        {movieData?.map((item) => (
          <MovieCard
            title={item.title}
            release={item.release_date}
            poster={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            id={item.id}
            setIsLoading={setIsLoading}
            key={item.id}
          />
        ))}
      </Box>
      <Backdrop
        sx={{
          color: (theme) => theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress size={80} color='inherit' />
      </Backdrop>
    </Box>
  );
};

export default HomeAuth;
