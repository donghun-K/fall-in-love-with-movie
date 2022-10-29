import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://master:${process.env.DB_PW}@film.p7qxnpb.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}
