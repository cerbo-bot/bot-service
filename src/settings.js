import dotenv from 'dotenv';

dotenv.config();
export const { ENV, PORT, FIREBASE_DATABASE_URL } = process.env;
