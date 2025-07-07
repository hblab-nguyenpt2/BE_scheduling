import { ApiProperty } from '@nestjs/swagger'

import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({ required: true, format: 'email' })
  @IsNotEmpty()
  email!: string

  @ApiProperty({
    required: true,
    format: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password!: string
}
