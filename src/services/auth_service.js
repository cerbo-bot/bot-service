import axios from 'axios';
import firebase from './firebase/firebase_admin_config';

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAymaua61gPPWD4Pvc5P8FLr5s6f0GIqdA';

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
