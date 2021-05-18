import firebase from 'firebase-admin';
import { FIREBASE_DATABASE_URL } from '../../settings';

const serviceAccount = require('./firebase_permission.json');

export default firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DATABASE_URL
});
