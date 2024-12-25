import express from 'express';
import { RabbitMQController } from './rabitmq.controller';
export const rabitmqRouter = express.Router();

rabitmqRouter.post('/send', RabbitMQController.sendToQueue);
