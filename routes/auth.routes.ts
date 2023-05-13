import { Router } from "express";
import RouteInterface from "../interfaces/routes.interface";
import AuthController from "../controllers/auth.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { SignupDTO } from "../dtos/auth.dto";

export class AuthRoutes implements RouteInterface {
  public router = Router();
  public path = "/auth";

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/signup`,
      validationMiddleware(SignupDTO, "body"),
      this.authController.signup
    );
  }
}
