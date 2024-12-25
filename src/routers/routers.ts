import { Router } from 'express';
import userRouter from '../modules/users/user.router';

const routers: Router[] = [userRouter];

export default routers;
