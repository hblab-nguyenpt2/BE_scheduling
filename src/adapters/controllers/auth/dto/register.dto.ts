import { ApiProperty } from '@nestjs/swagger'

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNotEmpty,
} from 'class-validator'

import { UserRoleEnum } from '@domain/entities/role.entity'
import { UserStatusEnum } from '@domain/entities/status.entity'

export class RegisterDto {
  @ApiProperty({ required: true, format: 'email' })
  @IsNotEmpty()
  email!: string

  @ApiProperty({ required: true, format: 'username' })
  @IsNotEmpty()
  @IsString()
  username!: string

  @ApiProperty({
    required: true,
    format: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password!: string

  @ApiProperty({ required: true, format: 'role', default: UserRoleEnum.CLIENT })
  @IsNumber()
  @IsOptional()
  role!: UserRoleEnum

  @ApiProperty({ format: 'status', default: UserStatusEnum.INACTIVE })
  @IsOptional()
  status?: UserStatusEnum

  @ApiProperty({ default: false })
  @IsOptional()
  emailVerified?: boolean
}
