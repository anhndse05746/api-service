import 'module-alias/register';
import configDotenv from 'dotenv';
configDotenv.config();
import express, { Request, Response } from 'express';

import routers from '@/routers/routers';
import { errorHandler } from '@/middlewares/errorHandler';
export const app = express();
const PORT = process.env.PORT || 3000;

app.use(routers);
app.use(errorHandler);

app.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).send('API is healthy');
});

app.get('/error', (req, res) => {
  throw new Error('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Api service listening at http://localhost:${PORT}`);
});
