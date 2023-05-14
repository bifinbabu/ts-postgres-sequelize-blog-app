import { LoginDTO, SignupDTO } from "../dtos/auth.dto";
import {
  LoginResponseInterface,
  UserInterface,
} from "../interfaces/auth.interface";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendEmail";

export class AuthService {
  public async signup(data: SignupDTO): Promise<UserInterface> {
    const user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw { status: 409, message: "User already exist" };
    }
    const newPassword = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      email: data.email,
      name: data.name,
      password: newPassword,
    });
    console.log(newUser);

    const result = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isVerified: newUser.isVerified,
    };

    const token = await jwt.sign(result, process.env.JWT_SECRET as string, {
      expiresIn: 86400,
    });

    sendMail(newUser.email, newUser.name, token);

    return result;
  }
  public async login(data: LoginDTO): Promise<LoginResponseInterface> {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      throw { status: 404, message: "User does not exist" };
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw { status: 400, message: "Incorrect password" };
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: 86400,
    });

    return { user: payload, token: `Bearer ${token}` };
  }
}
