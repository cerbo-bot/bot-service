import logger from '../services/logger';

const decodeBase64Json = (data) => JSON.parse(Buffer.from(data, 'base64').toString());

/**
 * Validates queries for empty strings or other string sanitations
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
export const queryValidator = (req, res, next) => {
  if (!req.body) {
    const msg = 'no Pub/Sub message received';
    logger.error(`error: ${msg}`);
    res.status(400).send({ message: msg });
    return;
  }
  if (!req.body.message) {
    const msg = 'invalid Pub/Sub message format';
    logger.error(`error: ${msg}`);
    res.status(400).send({ message: msg });
    return;
  }
  const pubSubMessage = req.body.message;
  const messageBody = pubSubMessage.data; // DELETE
  // const messageBody = pubSubMessage.data
  //   ? decodeBase64Json(pubSubMessage.data)
  //   : null;
  if (!messageBody || !messageBody.uid) {
    const msg = 'no Pub/Sub message received';
    logger.error(`error: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }
  req.body.messageBody = messageBody;
  next();
};
