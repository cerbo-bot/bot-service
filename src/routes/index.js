import express from 'express';
import { indexPage } from '../controllers';
import replyRouter from './reply';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.use('/reply', replyRouter);

export default indexRouter;
