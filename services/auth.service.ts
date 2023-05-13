import { SignupDTO } from "../dtos/auth.dto";
import { User, UserAttributes } from "../models/User";
import bcrypt from "bcrypt";

export class AuthService {
  public async signup(data: SignupDTO): Promise<UserAttributes> {
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
    return newUser;
  }
}
