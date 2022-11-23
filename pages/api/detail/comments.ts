import { connectToDatabase } from '../../../lib/db';

async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { movieCode, username } = req.query;
    const client = await connectToDatabase();
    const db = client.db('film');
    const response = await db
      .collection('posts')
      .find({
        movieCode,
        username: { $ne: username },
        comment: { $exists: true },
      })
      .toArray();
    client.close();
    // console.log(response);
    res.status(201).json({
      datas: response,
    });
  }
}

export default handler;
