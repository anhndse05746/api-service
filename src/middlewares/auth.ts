import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from 'src/utils/HttpException';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    next(new HttpException(401, 'Unauthorized'));
    return;
  }

  const token = header.split(' ')[1];
  if (!token) {
    next(new HttpException(401, 'Unauthorized'));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  if (!decode) {
    next(new HttpException(401, 'Unauthorized'));
  }

  next();
};
