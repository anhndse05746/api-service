import express from 'express';
import { UserController } from './user.controller';
const userRouter = express.Router();

userRouter.get('/user', UserController.get);

export default userRouter;
