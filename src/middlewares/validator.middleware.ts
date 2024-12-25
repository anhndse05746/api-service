import { validate } from 'class-validator';
import { NextFunction, Response, Request } from 'express';
import HttpException from 'src/utils/HttpException';

type DTO = { new (): Object };

export const validator =
  (dto: DTO) => async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body ?? {};
    const validateData = new dto();
    Object.assign(validateData, data);

    const errors = await validate(validateData);
    if (errors.length !== 0) {
      next(new HttpException(400, 'Validation error'));
    }
    next();
  };
