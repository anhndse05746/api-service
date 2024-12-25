import 'reflect-metadata';
import 'module-alias/register';
import configDotenv from 'dotenv';
configDotenv.config();
import express, { Request, Response } from 'express';

import routers from './routers/routers';
import { errorHandler } from './middlewares/error-handler.middleware';
import HttpException from './utils/HttpException';
import { AppDataSource } from './modules/database/data-source';
import { connectRabitMQ, receiveMessages } from './utils/queue/rabitmq';

export const app = express();
const PORT = process.env.PORT || 3000;
const RABITMQ_URL = process.env.RABITMQ_URL || 'amqp://localhost';
const RABITMQ_QUEUE = process.env.RABITMQ_QUEUE || 'default';

app.use(express.json());
app.use(routers);

// RabitMQ
(async () => {
  try {
    await connectRabitMQ(RABITMQ_URL);

    await receiveMessages(RABITMQ_QUEUE, (msg) => {
      console.log(`Received message: ${msg}`);
    });
  } catch (err) {
    console.log('Error setting up RabbitMQ:', err);
  }
})();

app.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).send('API is healthy!');
});

app.get('/error', () => {
  throw new HttpException(500, 'Something went wrong!');
});

app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected!');
    app.listen(PORT, () => {
      console.log(`Api service listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
