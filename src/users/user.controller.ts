import { Request, Response, Application } from "express";

export class UserController {
  get(req: Request, res: Response) {
    res.send("I'm a user");
  }
}

export default new UserController();
