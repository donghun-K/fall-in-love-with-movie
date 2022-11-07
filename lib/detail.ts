import axios from 'axios';

export async function getImageSrc(movieId: string) {
  const response = await axios.post('/api/detail', {
    movieId: movieId,
  });
  const imageSrc = response.data.imageSrc;
  return imageSrc;
}
