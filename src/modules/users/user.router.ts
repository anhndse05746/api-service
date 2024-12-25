import express from 'express';
import { UserController } from './user.controller';
import { validator } from '../../middlewares/validator';
import { CreateUserDto } from './dtos/user.dto';
const userRouter = express.Router();

userRouter.get('/user', validator(CreateUserDto), UserController.get);

export default userRouter;
