import { Router } from "express";

export class AuthRoutes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/test", (req, res) => res.json({ message: "Success" }));
  }
}
