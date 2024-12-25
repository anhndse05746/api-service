import { Router } from 'express';
import userRouter from '../modules/users/user.router';
import { rabitmqRouter } from 'src/modules/rabitmq/rabitmq.route';

const routers: Router[] = [userRouter, rabitmqRouter];

export default routers;
