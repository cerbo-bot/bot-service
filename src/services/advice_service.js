import axios from 'axios';
import logger from './logger';

export const adviceService = async () => {
  const response = await axios.get(
    'https://api.adviceslip.com/advice'
  );
  if (response.status === 200) {
    const { advice } = response.data.slip;
    logger.info(advice);
    return advice;
  }
  return { err: 'No data' };
};
