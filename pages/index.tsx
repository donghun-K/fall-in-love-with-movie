import { NextPage } from 'next/types';
import HomeUnauth from '../components/home/home-unauth';

import { useSession } from 'next-auth/react';
import HomeAuth from '../components/home/home-auth';
import Head from 'next/head';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>FILM - Fall In Love with Money</title>
      </Head>
      {status === 'authenticated' ? <HomeAuth /> : <HomeUnauth />}
    </>
  );
};

export default Home;
