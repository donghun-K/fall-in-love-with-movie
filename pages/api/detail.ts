import axios from 'axios';

async function handler(req: any, res: any) {
  const { movieId } = req.body;
  const response = await axios({
    url: `https://api.themoviedb.org/3//movie/${movieId}?api_key=${process.env.API_KEY}&language=ko-KR`,
    method: 'get',
  });
  res.status(201).json({ data: response.data });
}

export default handler;
