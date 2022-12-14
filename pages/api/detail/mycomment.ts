import { connectToDatabase } from '../../../lib/db';

async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { username, movieCode, comment } = req.body;
    if (username === undefined) {
      return;
    }
    const client = await connectToDatabase();
    const db = client.db('film');
    const date = new Date().toLocaleString();

    const response = await db.collection('posts').updateOne(
      { username: username, movieCode: movieCode },
      {
        $set: {
          comment: comment,
          date: date,
        },
      },
      {
        upsert: true,
      }
    );

    client.close();
    res.status(201).json({ message: 'Update Comment' });
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
    res.status(201).json({ comment: response?.comment, date: response?.date });
  }
  if (req.method === 'DELETE') {
    const { username, movieCode } = req.query;
    const client = await connectToDatabase();
    const db = client.db('film');
    const response = await db.collection('posts').updateOne(
      { username: username, movieCode: movieCode },
      {
        $set: {
          comment: null,
          date: null,
        },
      }
    );
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
    client.close();
    res.status(201).json({ message: 'Delete Success!' });
  }
}

export default handler;
