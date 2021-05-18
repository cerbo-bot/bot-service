import express from 'express';
import { indexPage } from '../controllers';
import replyRouter from './reply';

const indexRouter = express.Router();

indexRouter.use('/reply', replyRouter);
indexRouter.get('/', indexPage);

export default indexRouter;
