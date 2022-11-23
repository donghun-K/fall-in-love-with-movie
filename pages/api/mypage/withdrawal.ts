import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === undefined) {
      return;
    }

    const client = await connectToDatabase();
    const userCollection = client.db('film').collection('users');
    const postCollection = client.db('film').collection('posts');
    const dbUser = await userCollection.findOne({
      name: username,
    });

    if (!dbUser) {
      res.status(211).json({ message: '사용자를 찾을 수 없습니다!' });
      client.close();
      return;
    }

    const isValid = await verifyPassword(password, dbUser?.password);

    if (!isValid) {
      res.status(211).json({ message: '비밀번호가 틀렸습니다!' });
      client.close();
      return;
    }

    await userCollection.deleteOne({
      name: username,
    });
    await postCollection.deleteMany({
      username: username,
    });

    res.status(201).json({ message: '탈퇴 성공' });
    client.close();
  }
}

export default handler;
