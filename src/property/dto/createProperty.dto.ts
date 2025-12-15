import { IsString, IsNumber, Length, IsPositive } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(2, 20, { groups: ['create'] })
  @Length(2, 25, { groups: ['update'] })
  name: string;

  @IsString()
  description: string;

  // @IsNumber()
  // @IsPositive()
  // area: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  address: string;

  // @IsNumber()
  // @IsPositive()
  // ownerId: number;
}
