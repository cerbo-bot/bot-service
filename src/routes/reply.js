import express from 'express';
import { sendReply } from '../controllers';

const replyRouter = express.Router();

replyRouter.get('/', sendReply);

export default replyRouter;
