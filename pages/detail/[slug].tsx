import { GetStaticProps, GetStaticPaths } from 'next/types';
import Typography from '@mui/material/Typography';
import { Box, Grid, Rating } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Detail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const getMovieDetail = async (movieId: string) => {
  const response = await axios.post('/api/detail', {
    movieId: movieId,
  });
  const data = response.data.data;
  return data;
};

const DetailPage = (props: { data: string }) => {
  const [movieDetail, setMovieDetail] = useState<Detail>();
  useEffect(() => {
    getMovieDetail(props.data).then((res) => {
      setMovieDetail(res);
    });
  }, [props]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {movieDetail !== undefined ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mt: '5rem',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={5}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
                  width={288}
                  height={400}
                  alt={movieDetail.title}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={7}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '400px',
                  }}
                >
                  <Box>
                    <Typography variant='subtitle1' color='primary'>
                      {movieDetail.release_date.match(/[0-9]{4}/)}
                    </Typography>
                    <Typography variant='h3' mt={1} mb={1} color='primary'>
                      {movieDetail.title}
                    </Typography>
                    <Typography variant='subtitle1' color='primary'>
                      {movieDetail.runtime} min |{' '}
                      {movieDetail.genres.map((item) => item.name).join(', ')}
                    </Typography>
                  </Box>
                  <Typography variant='body1' color='primary'>
                    {movieDetail.overview}
                  </Typography>
                  <Box>
                    <Rating
                      sx={{
                        fontSize: '4rem',
                        '& .MuiRating-icon': {
                          color: (theme) => theme.palette.primary.main,
                        },
                      }}
                      precision={0.5}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography>Comments</Typography>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default DetailPage;

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
