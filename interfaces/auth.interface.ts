export interface LoginResponseInterface {
  user: UserInterface;
  token: string;
}

export interface UserInterface {
  id: number;
  email: string;
  name: string;
  isVerified: Boolean;
}
