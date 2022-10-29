import { Awaitable, User } from 'next-auth/core/types';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (credentials === undefined) {
          return null;
        }
        const client = await connectToDatabase();

        const userCollection = client.db('film').collection('users');

        const dbUser = await userCollection.findOne({
          email: credentials.email,
        });

        if (!dbUser) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          dbUser.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }
        client.close();

        const user: Awaitable<User | null> = {
          id: String(dbUser._id),
          name: dbUser.name,
          email: dbUser.email,
        };
        return user;
      },
    }),
  ],
});
