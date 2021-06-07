import { adviceService } from '../services/advice_service';
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
    }
    if (reply) dbWrite(reply, roomId);
    else throw new Error('No reply to send.');
    res.status(200).json({ success: true, message: 'message sent.' });
  } catch (err) {
    logger.error(`${err}`);
    res.status(500).json({ success: false, message: '🤯 Our server died... 🪦  We will fix it.', error: err });
  }
};
