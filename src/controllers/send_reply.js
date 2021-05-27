import { adviceService } from '../services/advice_service';
import { dbWrite, getRoomId } from '../services/firebase/db_operations';
import logger from '../services/logger';

const decodeBase64Json = (data) => JSON.parse(Buffer.from(data, 'base64').toString());

export const sendReply = async (req, res) => {
  if (!req.body) {
    const msg = 'no Pub/Sub message received';
    logger.error(`error: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }
  if (!req.body.message) {
    const msg = 'invalid Pub/Sub message format';
    logger.error(`error: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }
  const advice = await adviceService();
  if (advice) {
    try {
      const pubSubMessage = req.body.message;
      const messageBody = pubSubMessage.data
        ? decodeBase64Json(pubSubMessage.data)
        : null;

      if (!messageBody || !messageBody.uid) {
        const msg = 'no Pub/Sub message received';
        logger.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
      }
      const roomId = await getRoomId(messageBody.uid);
      logger.debug(`Sending advice to ${roomId}`);
      dbWrite(advice, roomId);
      res.status(200).json({ success: true, message: 'message sent.' });
    } catch (err) {
      logger.error(`${err}`);
      res.status(500).json({ success: false, message: '🤯 Our server died... 🪦  We will fix it.', error: err });
    }
  }
};
