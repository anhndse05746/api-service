import express from 'express';
import { UserController } from './user.controller';
import { validator } from '../../middlewares/validator.middleware';
import { CreateUserDto } from './dtos/user.dto';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { cacheMiddleware } from 'src/middlewares/cache.middleware';
const userRouter = express.Router();

userRouter.get(
  '/user',
  authMiddleware,
  validator(CreateUserDto),
  UserController.get
);
userRouter.get('/login', UserController.login);

export default userRouter;
