import express from 'express';
import cookieParser from 'cookie-parser';
import morganMiddleware from './middleware/morgan';
import logger from './services/logger';
import indexRouter from './routes/index';

const app = express();
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRouter);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('🤯 Our server died... 🪦');
  next();
});

export default app;
