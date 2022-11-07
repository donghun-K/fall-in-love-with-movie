import axios from 'axios';
import { load } from 'cheerio';

async function handler(req: any, res: any) {
  const { movieId } = req.body;
  const response = await axios.get(
    `https://movie.naver.com/movie/bi/mi/photoViewPopup.naver?movieCode=${movieId}`
  );
  const $ = load(response.data);

  const imageEl = $('#targetImage');
  const imageSrc = imageEl.attr().src;
  res.status(201).json({ imageSrc: imageSrc });
}

export default handler;
