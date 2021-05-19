import express from 'express';
import { sendReply } from '../controllers';

const replyRouter = express.Router();

replyRouter.post('/', sendReply);

export default replyRouter;
