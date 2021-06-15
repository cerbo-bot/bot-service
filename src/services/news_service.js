import axios from 'axios';
import { getOAuthToken } from './auth_service';

const url = 'https://cerbo.platinos.in/v1/news/search/';

export const newsService = async (query, uid) => {
  const token = await getOAuthToken(uid);
  const response = await axios.get(
    url.concat(query),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
  if (response.status === 200) {
    return response.data.message;
  }
  return { err: 'No data' };
};
