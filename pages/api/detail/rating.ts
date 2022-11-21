import { connectToDatabase } from '../../../lib/db';

async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { username, movieCode, rating } = req.body;
    if (username === undefined) {
      return;
    }
    const client = await connectToDatabase();
    const db = client.db('film');

    const response = await db.collection('posts').updateOne(
      { username: username, movieCode: movieCode },
      {
        $set: {
          rating: rating,
        },
      },
      {
        upsert: true,
      }
    );

    if (rating === null) {
      const check = await db
        .collection('posts')
        .findOne({ username: username, movieCode: movieCode });

      if (
        (check?.rating === undefined || check?.rating === null) &&
        (check?.comment === undefined || check?.comment === null)
      ) {
        const del = await db
          .collection('posts')
          .deleteOne({ username: username, movieCode: movieCode });
      }
    }

    client.close();
    res.status(201).json({ message: 'Update Rating' });
  }
  if (req.method === 'GET') {
    const { username, movieCode } = req.query;
    const client = await connectToDatabase();
    const db = client.db('film');
    const response = await db.collection('posts').findOne({
      username,
      movieCode,
    });
    client.close();
    res.status(201).json({ rating: response?.rating });
  }
}

export default handler;
