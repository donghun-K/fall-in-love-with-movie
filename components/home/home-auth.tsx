import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
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

  useEffect(() => {
    getMovieData().then((res) => {
      setMovieData(res.results);
    });
  }, []);
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box>
      <Typography
        sx={{
          color: 'white',
          fontWeight: 'bolder',
          fontSize: isDownSm ? '1.5rem' : '2rem',
        }}
        ml={isDownSm ? 3 : 5}
        mt={isDownSm ? 0 : 3}
      >
        상영 중인 영화
      </Typography>
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
            key={item.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HomeAuth;
