import { adviceService } from '../services/advice_service';
import { dbWrite, getRoomId } from '../services/firebase/db_operations';
import logger from '../services/logger';

const decodeBase64Json = (data) => JSON.parse(Buffer.from(data, 'base64').toString);

export const sendReply = async (req, res) => {
  const advice = await adviceService();
  if (advice) {
    try {
      const messageBody = decodeBase64Json(req.body.message.data);
      logger.info(messageBody);
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
