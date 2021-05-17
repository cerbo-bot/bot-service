import admin from 'firebase-admin';
import firebase from './firebase_admin_config';
import logger from '../logger';

const db = firebase.firestore();

export const dbWrite = async (text, roomId = 'cheWpV697Re7ahQ1buoZ') => {
  const docRef = await db.collection(`rooms/${roomId}/messages`).add(
    {
      authorId: 're1HNZgn07PYrL1nv06GGCJGAz13',
      metadata: null,
      mimeType: null,
      size: null,
      status: null,
      timestamp: admin.firestore.Timestamp.now(),
      type: 'text',
      text,
    }
  );
  logger.info(`added new message with Id: ${docRef.id}`);
};

export const getRoomId = async (uid = 'QPzl5sLmbvaCZWai9OczgWh6E3V2') => {
  const query = db.collection('rooms').where('userIds', 'array-contains', uid).limit(1);
  return query.get();
};
