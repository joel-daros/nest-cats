import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserModel from '../../database/models/user.model';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await UserModel.query()
      .where('username', username)
      .first();

    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Partial<UserModel>) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
    };
  }
}
