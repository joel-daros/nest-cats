import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, {
    message:
      'Seu nome de usuário precisa ter no mínimo $constraint1 caracteres',
  })
  @MaxLength(7, {
    message:
      'Seu nome de usuário precisa ter no máximo $constraint1 caracteres',
  })
  username: string;

  @IsString()
  @MinLength(5)
  passwordHash: string;

  @IsEmail()
  email: string;
}
