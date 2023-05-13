import { Request, Response, NextFunction } from "express";
import { SignupDTO } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";

class AuthController {
  public authService = new AuthService();
  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: SignupDTO = req.body;
      const data = await this.authService.signup(userData);
      res.status(201).json({ message: "User created successfully", data });
    } catch (error: any) {
      res
        .status(error.status ?? 500)
        .json({ message: error.message ?? "Something went wrong" });
    }
  };
}

export default AuthController;
