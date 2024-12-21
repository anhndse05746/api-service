import { Router } from "express";
import userRouter from "../users/user.router";

const routers: Router[] = [userRouter];

export default routers;

