import express from 'express';
import { sendReply } from '../controllers';
import { intentDetector, queryValidator } from '../middleware';

const replyRouter = express.Router();

replyRouter.post('/', queryValidator, intentDetector, sendReply);

export default replyRouter;
