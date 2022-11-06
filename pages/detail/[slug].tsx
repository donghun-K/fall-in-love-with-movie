import { GetStaticProps, GetStaticPaths } from 'next/types';
import Typography from '@mui/material/Typography';
import { Box, Grid, Rating, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import theme from '../../src/theme';

const DUMMY_DATA = {
  title: 'Dummy Title',
  min: '139분',
  genre: '액션, 코미디 ',
  pubDate: '2022',
  synopsis:
    '미국에 이민 와 힘겹게 세탁소를 운영하던 에블린은 세무당국의 조사에 시달리던 어느 날 남편의 이혼 요구와 삐딱하게 구는 딸로 인해 대혼란에 빠진다. 그 순간 에블린은 멀티버스 안에서 수천, 수만의 자신이 세상을 살아가고 있다는 사실을 알게 되고, 그 모든 능력을 빌려와 위기의 세상과 가족을 구해야 하는 운명에 처한다.',
  image:
    'https://movie-phinf.pstatic.net/20220923_263/1663900781920FODkW_JPEG/movie_image.jpg',
};

const DetailPage = (props: { data: string }) => {
  const movieId = props.data;
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
          sm={5}
          md={6}
          lg={5}
          padding={isDownSm ? '1rem' : 0}
          sx={{
            display: 'flex',
            justifyContent: isDownMd ? 'center' : 'flex-start',
          }}
        >
          <Image
            src={DUMMY_DATA.image}
            width={isDownMd ? (isDownSm ? 324 : 216) : 288}
            height={isDownMd ? (isDownSm ? 450 : 300) : 400}
            alt={DUMMY_DATA.title}
          />
        </Grid>
        <Grid item xs={10} sm={5} md={6} lg={7} pl={isDownMd ? 1 : 0}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: isDownSm ? 'center' : 'space-between',
              height: isDownMd ? '300px' : '400px',
            }}
          >
            <Box>
              <Typography
                variant='subtitle1'
                color='primary'
                sx={{
                  fontSize: isDownMd ? '.6rem' : '.8rem',
                  color: 'gray',
                  fontWeight: 'bolder',
                }}
              >
                {DUMMY_DATA.pubDate}
              </Typography>
              <Typography
                variant='h3'
                mb={1}
                color='primary'
                sx={{
                  fontSize: isDownMd ? '1.8rem' : '2.5rem',
                  color: 'white',
                  fontWeight: 'bolder',
                }}
              >
                {DUMMY_DATA.title}
              </Typography>
              <Typography
                variant='subtitle1'
                color='primary'
                sx={{
                  fontSize: isDownMd ? '.6rem' : '.8rem',
                  color: 'gray',
                  fontWeight: 'bolder',
                }}
              >
                {DUMMY_DATA.min} | {DUMMY_DATA.genre}
              </Typography>
            </Box>
            <Typography
              variant='body1'
              color='primary'
              mt={isDownSm ? 1 : 0}
              mb={isDownSm ? 1 : 0}
              sx={{
                fontSize: isDownMd ? '.8rem' : '.9rem',
                color: 'lightgray',
              }}
            >
              {DUMMY_DATA.synopsis}
            </Typography>
            <Box>
              <Rating
                sx={{
                  fontSize: isDownMd
                    ? isDownSm
                      ? '2.8rem'
                      : '2.3rem'
                    : '3.5rem',
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
      <Box>
        <Typography>Comments</Typography>
      </Box>
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
