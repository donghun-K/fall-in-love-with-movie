import axios from 'axios';

async function handler(req: any, res: any) {
  const { query } = req.body;
  if (query === undefined) {
    return;
  }
  const response = await axios({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&page=1&include_adult=true&query=${query}`,
    method: 'get',
  });
  res.status(201).json({ data: response.data });
}

export default handler;
