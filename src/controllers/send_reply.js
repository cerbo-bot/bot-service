import _ from 'lodash';
import { adviceService } from '../services/advice_service';
import { newsService } from '../services/news_service';
import { dbWrite, getRoomId } from '../services/firebase/db_operations';
import logger from '../services/logger';

export const sendReply = async (req, res) => {
  try {
    const { uid, intent } = req.body.messageBody;
    let { reply } = req.body.messageBody;
    const roomId = await getRoomId(uid);
    logger.debug(`Sending message to ${roomId}`);
    // Replying according to intent
    if (intent === 'advice') {
      const advice = await adviceService();
      const { err } = advice;
      if (!err) reply = advice;
      if (reply) await dbWrite(reply, roomId);
      else throw new Error('No reply to send.');
    } else if (intent === 'news') {
      const newsLinks = await newsService('github', uid);
      let i = 0;
      _.forEach(newsLinks, async (newsItem) => {
        i += 1;
        if (i > 3) return false;
        const textToSend = `${newsItem.title} \n ${newsItem.url}`;
        logger.info(newsItem.textToSend);
        reply = textToSend;
        if (reply) await dbWrite(reply, roomId);
        else throw new Error('No reply to send.');
      });
    } else if (reply) await dbWrite(reply, roomId);
    else throw new Error('No reply to send.');
    res.status(200).json({ success: true, message: 'message sent.' });
  } catch (err) {
    logger.error(`${err}`);
    res.status(500).json({ success: false, message: '🤯 Our server died... 🪦  We will fix it.', error: err });
  }
};
