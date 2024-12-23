import 'module-alias/register';
import express, { Request, Response } from 'express';
import routers from './routers/routers';
import configDotenv from 'dotenv';
configDotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(routers);

app.get('healthcheck', (req: Request, res: Response) => {
  res.status(200).send('API is healthy');
});

app.listen(PORT, () => {
  console.log(`Api service listening at http://localhost:${PORT}`);
});
