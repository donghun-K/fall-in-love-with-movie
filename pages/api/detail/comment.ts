import { connectToDatabase } from '../../../lib/db';

async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { username, movieCode, comment } = req.body;
    if (username === undefined) {
      return;
    }
    const client = await connectToDatabase();
    const db = client.db('film');

    const response = await db.collection('ratings').updateOne(
      { username: username, movieCode: movieCode },
      {
        $set: {
          comment: comment,
        },
      },
      {
        upsert: true,
      }
    );

    res.status(201).json({ message: 'Update Comment' });
  }
  if (req.method === 'GET') {
    const { username, movieCode } = req.query;
    const client = await connectToDatabase();
    const db = client.db('film');
    const response = await db.collection('ratings').findOne({
      username,
      movieCode,
    });
    res.status(201).json({ comment: response?.comment });
  }
}

export default handler;
