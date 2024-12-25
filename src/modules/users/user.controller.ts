import { Request, Response } from 'express';
import { User } from './entities/user.entity';
import { AppDataSource } from '../database/data-source';

export class UserController {
  static async get(req: Request, res: Response) {
    const users = await AppDataSource.getRepository(User).find();
    res.status(200).json(users);
  }
}
