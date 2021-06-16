import _ from 'lodash';
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
    const topic = _.get(intentResponse, 'queryResult.parameters.fields.news_topic.stringValue', '');
    req.body.messageBody.topic = topic;
    const intent = _.get(intentResponse, 'queryResult.intent.displayName');
    req.body.messageBody.reply = _.get(intentResponse, 'queryResult.fulfillmentText', '');
    if (intent) {
      req.body.messageBody.intent = intent;
      // entities identification
    } else {
      req.body.messageBody.intent = 'default';
      throw new Error('Intent not recognised.');
    }
  } catch (error) {
    logger.error(`${error}`);
  }
  next();
};
