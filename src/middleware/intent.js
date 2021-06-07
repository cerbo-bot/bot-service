import logger from '../services/logger';
import { detectIntent } from '../services/dialog-flow';

export const intentDetector = async (req, res, next) => {
  let context;
  let intentResponse;
  const projectId = 'cerbo-313610';
  const languageCode = 'en';
  const query = req.body.messageBody.message;
  const sessionId = req.body.messageBody.uid;
  try {
    logger.info(`Sending Query: ${query}`);
    intentResponse = await detectIntent(
      projectId,
      sessionId,
      query,
      context,
      languageCode
    );
    logger.info(intentResponse.queryResult);
    const intent = intentResponse.queryResult.intent.displayName;
    if (intent) {
      req.body.messageBody.intent = intent;
      req.body.messageBody.reply = intentResponse.queryResult.fulfillmentText;
    } else {
      req.body.messageBody.intent = 'default';
      req.body.messageBody.reply = intentResponse.queryResult.fulfillmentText;
      throw new Error('Intent not recognised.');
    }
  } catch (error) {
    logger.error(`${error}`);
  }
  next();
};
