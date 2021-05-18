import dotenv from 'dotenv';

dotenv.config();
export const { NODE_ENV, NODE_PORT, FIREBASE_DATABASE_URL } = process.env;
