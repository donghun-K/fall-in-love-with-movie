import axios from 'axios';

async function handler(req: any, res: any) {
  const { query } = req.body;
  const response = await axios({
    url: `https://openapi.naver.com/v1/search/movie.json?query=${query}`,
    method: 'get',
    headers: {
      'X-Naver-Client-Id': process.env.NAVER_ID,
      'X-Naver-Client-Secret': process.env.NAVER_SECRET,
    },
  });
  res.status(201).json({ data: response.data });
}

export default handler;
