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
      res.status(422).json({ message: 'Invalid input' });
    }

    const client = await connectToDatabase();

    const db = client.db('film');

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
      res.status(422).json({
        message: 'Email exists already!',
      });
      client.close();
      return;
    }

    const existingName = await db.collection('users').findOne({ name: name });

    if (existingName) {
      res.status(422).json({
        message: 'Username exists already!',
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

    res.status(201).json({ message: 'Created user!' });
    client.close();
  }
}

export default handler;
