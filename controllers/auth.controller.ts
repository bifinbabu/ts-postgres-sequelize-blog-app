import { Request, Response, NextFunction } from "express";
import { LoginDTO, SignupDTO } from "../dtos/auth.dto";
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

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginDTO = req.body;
      const data = await this.authService.login(userData);
      res.status(201).json({ message: "User logged in", data });
    } catch (error: any) {
      res
        .status(error.status ?? 500)
        .json({ message: error.message ?? "Something went wrong" });
    }
  };

  public verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.authService.verifyEmail(req.params.token);
      res.status(201).json({ message: "User verified successfully", data });
    } catch (error: any) {
      res
        .status(error.status ?? 500)
        .json({ message: error.message ?? "Something went wrong" });
    }
  };
}

export default AuthController;
