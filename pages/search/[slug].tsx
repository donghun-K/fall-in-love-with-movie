import Typography from '@mui/material/Typography';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Backdrop, Box, CircularProgress, useMediaQuery } from '@mui/material';
import MovieCard from '../../components/search/movie-card';
import theme from '../../src/theme';
import Head from 'next/head';

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

const SearchPage = (props: { data: string }) => {
  const [movieData, setMovieData] = useState<Data[]>();
  const [isLoading, setIsLoading] = useState(false);

  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const getMovieData = async (query: string) => {
    const response = await axios.post('/api/search', {
      query: query,
    });
    const data = response.data.data;
    return data;
  };
  useEffect(() => {
    getMovieData(props.data).then((res) => {
      setMovieData(res.results);
    });
  }, [props]);
  return (
    <Box>
      <Head>
        <title>Search - {props.data}</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
        ml={isDownSm ? 3 : 5}
        mt={isDownSm ? 0 : 3}
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.primary.main,
            fontSize: isDownSm ? '2rem' : '2.5rem',
            fontWeight: 'bolder',
          }}
          mr={1}
        >
          &apos;{props.data}&apos;
        </Typography>
        <Typography
          sx={{
            color: 'white',
            fontWeight: 'bolder',
            fontSize: isDownSm ? '1.5rem' : '2rem',
          }}
        >
          검색 결과
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
