import { GetStaticProps, GetStaticPaths } from 'next/types';
import Typography from '@mui/material/Typography';
import { Box, Grid, Rating, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import theme from '../../src/theme';
import { useSession } from 'next-auth/react';
import CommentsSection from '../../components/detail/comments-section';
import Head from 'next/head';

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
declare module 'axios' {
  export interface AxiosRequestConfig {
    username?: string | undefined | null;
    movieCode?: string;
  }
}

const DetailPage = (props: { data: string }) => {
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: session, status } = useSession();

  const [movieDetail, setMovieDetail] = useState<Detail>();
  const [rating, setRating] = useState<number | null>(null);

  const getMovieDetail = async (movieId: string) => {
    const response = await axios.post('/api/detail/detail', {
      movieId: movieId,
    });
    const data = response.data.data;
    return data;
  };

  const postRating = async ({
    username,
    movieCode,
    rating,
  }: {
    username: string | undefined | null;
    movieCode: string;
    rating: number | null;
  }) => {
    const response = await axios.post('/api/detail/rating', {
      username,
      movieCode,
      rating,
    });
  };

  const getRating = async ({
    username,
    movieCode,
  }: {
    username: string | undefined | null;
    movieCode: string;
  }) => {
    const response = await axios.get('/api/detail/rating', {
      params: { username, movieCode },
    });

    return response;
  };

  useEffect(() => {
    getMovieDetail(props.data).then((res) => {
      setMovieDetail(res);
    });
  }, [props]);
  useEffect(() => {
    if (status === 'unauthenticated') {
      setRating(null);
      return;
    }
    getRating({ username: session?.user?.name, movieCode: props.data }).then(
      (res) => {
        setRating(res.data.rating);
      }
    );
  }, [status, session, props]);

  if (movieDetail === undefined) {
    return <></>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Head>
        <title>{movieDetail?.title}</title>
      </Head>
      {movieDetail !== undefined ? (
        <>
          <Grid
            container
            spacing={0}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              mt: isDownMd ? '1rem' : '5rem',
            }}
          >
            <Grid
              item
              xs={10}
              sm={8}
              md={6}
              lg={5}
              sx={{
                display: 'flex',
                justifyContent: isDownMd ? 'center' : 'flex-start',
                mb: '1rem',
              }}
            >
              <Box
                sx={{
                  width: isDownMd ? '324px' : '288px',
                  height: isDownMd ? '450px' : '400px',
                  backgroundColor: 'white',
                  boxShadow: '0 0 .3rem .3rem white',
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
                  width={isDownMd ? 324 : 288}
                  height={isDownMd ? 450 : 400}
                  alt={movieDetail.title}
                />
              </Box>
            </Grid>
            <Grid item xs={10} sm={8} md={6} lg={7}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: isDownSm ? 'center' : 'space-between',
                  alignItems: isDownMd ? 'center' : 'flex-start',
                  height: isDownMd ? '300px' : '400px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isDownMd ? 'center' : 'flex-start',
                  }}
                >
                  <Typography
                    variant='h3'
                    mt={1}
                    mb={1}
                    color='primary'
                    sx={{
                      fontSize: isDownMd
                        ? isDownSm
                          ? '1.3rem'
                          : '1.8rem'
                        : '2rem',
                      color: 'white',
                      fontWeight: 'bolder',
                    }}
                  >
                    {movieDetail.title}
                  </Typography>

                  <Typography
                    variant='subtitle1'
                    color='primary'
                    sx={{
                      fontSize: isDownMd ? '.7rem' : '.8rem',
                      color: 'lightgray',
                      fontWeight: 'bolder',
                    }}
                  >
                    {movieDetail.release_date.match(/[0-9]{4}/)} |{' '}
                    {movieDetail.runtime} min |{' '}
                    {movieDetail.genres.map((item) => item.name).join(', ')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: isDownSm ? '120px' : '200px',
                    overflow: 'auto',
                    margin: isDownSm ? '1rem 0' : 0,
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
                  <Typography
                    variant='body1'
                    mt={isDownSm ? 1 : 0}
                    mb={isDownSm ? 1 : 0}
                    sx={{
                      fontSize: isDownMd ? '.8rem' : '.9rem',
                      color: 'lightgray',
                      maxHeight: '100%',
                    }}
                  >
                    {movieDetail.overview}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: isDownSm ? 'column-reverse' : 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Rating
                    sx={{
                      fontSize: isDownSm ? '2.5rem' : '2.8rem',
                      '& .MuiRating-icon': {
                        color: (theme) => theme.palette.primary.main,
                      },
                    }}
                    value={rating === undefined ? null : rating}
                    onChange={(e, value) => {
                      if (status === 'unauthenticated') {
                        alert('????????? ?????? ????????????!');
                        return;
                      }
                      if (rating === value) {
                        return;
                      }
                      if (value !== null) {
                        setRating(value);
                      } else {
                        setRating(null);
                      }
                      postRating({
                        username: session?.user?.name,
                        movieCode: props.data,
                        rating: value,
                      });
                    }}
                  />
                  <Typography
                    ml={isDownSm ? 0 : 2}
                    sx={{
                      color: 'white',
                      fontWeight: 'bolder',
                      fontSize: isDownSm ? '1rem' : '1.3rem',
                    }}
                  >
                    {rating !== null && rating !== undefined
                      ? `${rating} / 5`
                      : '????????????!'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <CommentsSection
            isDownMd={isDownMd}
            isDownSm={isDownSm}
            username={session?.user?.name as string}
            movieCode={props.data}
          />
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
