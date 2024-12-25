import express from 'express';
import { UserController } from './user.controller';
import { validator } from '../../middlewares/validator';
import { CreateUserDto } from './dtos/user.dto';
import { authMiddleware } from 'src/middlewares/auth';
import { cacheMiddleware } from 'src/middlewares/cache';
const userRouter = express.Router();

userRouter.get(
  '/user',
  authMiddleware,
  validator(CreateUserDto),
  UserController.get
);
userRouter.get('/login', UserController.login);

export default userRouter;
