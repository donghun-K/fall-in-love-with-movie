import { NextPage } from 'next/types';
import HomeUnauth from '../components/home/home-unauth';

import { useSession } from 'next-auth/react';
import HomeAuth from '../components/home/home-auth';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  return <>{status === 'authenticated' ? <HomeAuth /> : <HomeUnauth />}</>;
};

export default Home;
