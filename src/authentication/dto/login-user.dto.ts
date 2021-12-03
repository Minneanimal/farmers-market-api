import { User } from 'src/users/entities/user.entity';

export class LoginUserDto {
  user: User;
  access_token: string;
  expiresIn: number;
}
