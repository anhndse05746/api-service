import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from './entities/user.entity';
import { AppDataSource } from '../database/data-source';

export class UserController {
  static async get(req: Request, res: Response) {
    const users = await AppDataSource.getRepository(User).find();
    res.status(200).json(users);
  }

  static async login(req: Request, res: Response) {
    const token = jwt.sign({}, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1m',
    });

    res.status(200).json({ token });
  }
}
