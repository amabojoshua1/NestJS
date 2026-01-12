import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({
    example: 'Spacious 2-bedroom apartment in downtown',
  })
  @IsString()
  @IsString()
  description: string;

  // @IsNumber()
  // @IsPositive()
  // area: number;

  @ApiProperty({
    example: 100000,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  address: string;

  // @IsNumber()
  // @IsPositive()
  // ownerId: number;
}
