import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces/auth.interface";
import { User } from "../models/User";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (token) {
    try {
      const authToken = token.split("Bearer ")[1];
      const verified = jwt.verify(
        authToken,
        process.env.JWT_SECRET as string
      ) as UserInterface;

      const user = await User.findOne({ where: { id: verified.id } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!user.isVerified) {
        return res.status(401).json({ message: "User not verified" });
      }

      req.user = verified;

      next();
    } catch (error) {
      res.status(401).json({
        message:
          "Authentication token verification failed / Wrong authentication token",
      });
    }
  } else {
    res.status(401).json({ message: "Authentication token is missing" });
  }
}

export default authMiddleware;
