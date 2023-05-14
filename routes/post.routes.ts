import { Router } from "express";
import RouteInterface from "../interfaces/routes.interface";
import PostController from "../controllers/post.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { CreatePostDTO } from "../dtos/post.dto";
import authMiddleware from "../middlewares/auth.middleware";

export class PostRoutes implements RouteInterface {
  public router = Router();
  public path = "/post";

  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreatePostDTO, "body"),
      this.postController.createPost
    );
  }
}
