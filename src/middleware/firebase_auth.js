/* eslint-disable prefer-destructuring */
import admin from '../services/firebase/firebase_admin_config';
import logger from '../services/logger';

export const firebaseAuthMiddleware = async (req, res, next) => {
  logger.debug('Check if request is authorized with Firebase ID token');
  if (req.url.startsWith('/webhooks')) {
    logger.debug('Skipping validation for webhook');
    next();
    return;
  }
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
        && !(req.cookies && req.cookies.session)) {
    logger.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "session" cookie.');
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    logger.debug('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    logger.debug('Found "session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.session;
  } else {
    // No cookie
    res.status(403).send('Unauthorized');
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    logger.debug('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    logger.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  }
};
