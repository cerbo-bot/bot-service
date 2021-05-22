import admin from 'firebase-admin';
import firebase from './firebase_admin_config';
import logger from '../logger';

const db = firebase.firestore();

export const dbWrite = async (text, roomId = 'cheWpV697Re7ahQ1buoZ') => {
  const docRef = await db.collection(`rooms/${roomId}/messages`).add({
    authorId: 'ZkuedrNkNbtVbAE87sNC',
    metadata: null,
    mimeType: null,
    size: null,
    status: null,
    timestamp: admin.firestore.Timestamp.now(),
    type: 'text',
    text,
  });
  logger.info(`added new message with Id: ${docRef.id}`);
};

export const getRoomId = async (uid) => {
  const query = db.collection('rooms').where('userIds', 'array-contains', uid);

  const result = await query.get();
  if (result.empty) {
    throw new Error('User does not have any rooms.');
  }
  let roomId;
  result.forEach(doc => {
    if (doc.data().userIds.includes('ZkuedrNkNbtVbAE87sNC')) roomId = doc.id;
    logger.debug(doc.id, '=>', doc.data());
  });
  if (roomId) return roomId;
  throw new Error('Bot has not been added yet.');
};
