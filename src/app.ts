import 'module-alias/register';
import configDotenv from 'dotenv';
configDotenv.config();
import express, { Request, Response } from 'express';

import routers from '@/routers/routers';
import { errorHandler } from '@/middlewares/errorHandler';
import HttpException from './utils/HttpException';
export const app = express();
const PORT = process.env.PORT || 3000;

app.use(routers);

app.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).send('API is healthy!');
});

app.get('/error', () => {
  throw new HttpException(500, 'Something went wrong!');
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Api service listening at http://localhost:${PORT}`);
});
