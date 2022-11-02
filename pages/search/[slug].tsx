import Typography from '@mui/material/Typography';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import MovieCard from '../../components/search/movie-card';

interface Data {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: {
    title: string;
    link: string;
    image: string;
    subtitle: string;
    pubDate: string;
    director: string;
    actor: string;
    userRating: string;
  }[];
}
const getMovieData = async (query: string): Promise<Data> => {
  const response = await axios.post('/api/search', {
    query: query,
  });
  const data: Data = response.data.data;
  return data;
};

const SearchPage = (props: { data: string }) => {
  const [movieData, setMovieData] = useState<Data>();

  useEffect(() => {
    getMovieData(props.data).then((res) => {
      setMovieData(res);
    });
  }, [props]);

  return (
    <div>
      <Typography variant='h3' mt={1} color='primary'>
        &apos;{props.data}&apos; 검색 결과
      </Typography>
      {/* {movieData?.items.map((item) => (
        <Typography color='primary' key={item.title}>
          {item.title}
        </Typography>
      ))} */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
      >
        {movieData?.items.map((item) => (
          <MovieCard
            title={item.title}
            pubDate={item.pubDate}
            image={item.image}
            key={item.title}
          />
        ))}
      </Box>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  console.log('slug: ' + slug);
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
