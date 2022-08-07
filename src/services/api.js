import axios from 'axios';

export const getPictures = async (request, page) => {
  const searchParams = new URLSearchParams({
    key: '27957885-8dff7fee3c243073fce7c6825',
    q: request,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  });
  const URL = `https://pixabay.com/api/?${searchParams}`;
  try {
    const response = await axios.get(URL);
    return response.data.hits;
  } catch (error) {
    return error;
  }
};
