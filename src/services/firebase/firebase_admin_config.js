import firebase from 'firebase-admin';
import { FIREBASE_DATABASE_URL } from '../../settings';

export default firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
  databaseURL: FIREBASE_DATABASE_URL
});
