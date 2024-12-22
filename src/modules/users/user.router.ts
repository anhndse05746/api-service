import express from 'express';
import userController from './user.controller';
const userRouter = express.Router();

userRouter.get('/user', userController.get);

export default userRouter;
