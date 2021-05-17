import _ from 'lodash';
import { adviceService } from '../services/advice_service';
import { dbWrite, getRoomId } from '../services/firebase/db_operations';
import logger from '../services/logger';

export const sendReply = async (req, res) => {
  const advice = await adviceService();
  if (advice) {
    const roomData = await getRoomId();
    if (roomData.empty) {
      logger.debug('No matching documents.');
      res.status(404).json({ success: false, message: 'Could not send reply' });
    }
    const roomId = roomData.docs[0].id;
    logger.debug(`Sending advice to ${roomId}`);
    dbWrite(advice, roomId);
    res.status(200).json({ success: true, message: 'message sent.' });
  }
};
