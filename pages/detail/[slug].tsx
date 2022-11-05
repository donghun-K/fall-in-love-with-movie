import { GetStaticProps, GetStaticPaths } from 'next/types';
import Typography from '@mui/material/Typography';

const DetailPage = (props: { data: string }) => {
  const [title, pubDate] = props.data.split('_');
  return (
    <div>
      <Typography variant='h3' color='primary'>
        {title}
      </Typography>
      <Typography variant='h5' color='secondary'>
        {pubDate}
      </Typography>
    </div>
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
