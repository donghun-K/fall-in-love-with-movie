import { GetStaticProps, GetStaticPaths } from 'next/types';
import Typography from '@mui/material/Typography';
import { Box, Grid, Rating } from '@mui/material';
import Image from 'next/image';

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
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
              src={DUMMY_DATA.image}
              width={288}
              height={400}
              alt={DUMMY_DATA.title}
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
                  {DUMMY_DATA.pubDate}
                </Typography>
                <Typography variant='h3' mt={1} mb={1} color='primary'>
                  {DUMMY_DATA.title}
                </Typography>
                <Typography variant='subtitle1' color='primary'>
                  {DUMMY_DATA.min} | {DUMMY_DATA.genre}
                </Typography>
              </Box>
              <Typography variant='body1' color='primary'>
                {DUMMY_DATA.synopsis}
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
