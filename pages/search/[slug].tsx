import Typography from '@mui/material/Typography';
import { GetStaticPaths, GetStaticProps } from 'next/types';
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

const getMovieData = async (query: string) => {
  const response = await axios.post('/api/search', {
    query: query,
  });
  const data = response.data.data;
  return data;
};

const SearchPage = (props: { data: string }) => {
  const [movieData, setMovieData] = useState<Data[]>();

  useEffect(() => {
    getMovieData(props.data).then((res) => {
      setMovieData(res.results);
    });
  }, [props]);
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        pt: '20px',
      }}
    >
      <Typography
        sx={{
          fontSize: isDownSm ? '1.5rem' : '2.5rem',
        }}
        ml={5}
        mt={1}
        mb={1}
        color='primary'
      >
        &apos;{props.data}&apos; 검색 결과
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

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  return {
    props: {
      data: slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default SearchPage;
