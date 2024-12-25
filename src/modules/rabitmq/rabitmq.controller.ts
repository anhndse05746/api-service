import { NextFunction, Request, Response } from 'express';
import HttpException from 'src/utils/HttpException';
import { sendMessages } from 'src/utils/queue/rabitmq';

export class RabbitMQController {
  public static async sendToQueue(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ message: 'Message is required!' });
      return;
    }

    try {
      await sendMessages(process.env.QUEUE_NAME || 'default', message);
      res.status(200).json({ message: 'Message sent!' });
    } catch (err) {
      console.error('Error sending message:', err);
      next(new HttpException(500, 'Error sending message'));
    }
  }
}
