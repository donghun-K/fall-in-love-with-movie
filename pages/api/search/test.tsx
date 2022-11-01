import axios from 'axios';

async function handler(req: any, res: any) {
  const response = await axios({
    url: `https://openapi.naver.com/v1/search/movie.json?query=도라에몽`,
    method: 'get',
    headers: {
      'X-Naver-Client-Id': process.env.NAVER_ID,
      'X-Naver-Client-Secret': process.env.NAVER_SECRET,
    },
  });
  console.log(response.data);
  res.status(201).json({ data: response.data });
}

export default handler;
