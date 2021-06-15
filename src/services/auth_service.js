import axios from 'axios';
import firebase from './firebase/firebase_admin_config';
import { FIREBASE_API_KEY } from '../settings';

const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API_KEY}`;

export const getOAuthToken = async (uid) => {
  try {
    const customToken = await firebase.auth().createCustomToken(uid);
    const response = await axios.post(url, { token: customToken, returnSecureToken: true });
    if (response.status === 200) {
      const { idToken } = response.data;
      return idToken;
    }
    throw new Error('token not found');
  } catch (error) {
    Promise.reject(error);
  }
};
