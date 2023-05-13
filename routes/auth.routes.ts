import { Router } from "express";
import RouteInterface from "../interfaces/routes.interface";
import AuthController from "../controllers/auth.controller";

export class AuthRoutes implements RouteInterface {
  public router = Router();
  public path = "/auth";

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, this.authController.signup);
  }
}
