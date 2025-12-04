/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @Length(2, 15, { groups: ['create'] })
  @Length(2, 20, { groups: ['update'] })
  name: string;

  @IsString()
  @Length(10, 100)
  contactInfo: string;

  @IsEmail()
  email: string;
}
