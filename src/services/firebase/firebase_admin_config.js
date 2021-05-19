import firebase from 'firebase-admin';
import { FIREBASE_DATABASE_URL } from '../../settings';

export default firebase.initializeApp({
  databaseURL: FIREBASE_DATABASE_URL
});
