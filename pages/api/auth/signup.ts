import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const data = req.body;
    const { name, email, password } = data;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 8
    ) {
      res.status(422).json({ message: '유효하지 않은 값입니다.' });
    }

    const client = await connectToDatabase();
    const db = client.db('film');

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
      res.status(422).json({
        message: '이미 가입된 이메일입니다.',
      });
      client.close();
      return;
    }

    const existingName = await db.collection('users').findOne({ name: name });

    if (existingName) {
      res.status(422).json({
        message: '이미 사용 중인 이름입니다.',
      });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: '회원가입 성공!' });
    client.close();
  }
}

export default handler;
