import { Router } from "express";
import RouteInterface from "../interfaces/routes.interface";

export class AuthRoutes implements RouteInterface {
  public router = Router();
  public path = "/auth";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, (req, res) =>
      res.json({ message: "Success" })
    );
  }
}
