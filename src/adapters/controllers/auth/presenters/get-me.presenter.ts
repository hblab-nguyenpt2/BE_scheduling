import { ApiProperty } from '@nestjs/swagger'

import { UserRoleEnum } from '@domain/entities/role.entity'
import { UserStatusEnum } from '@domain/entities/status.entity'
import { UserEntity } from '@domain/entities/user.entity'

export class GetMePresenter {
  @ApiProperty({ required: true })
  id!: number
  @ApiProperty({ required: true })
  username!: string
  @ApiProperty({ required: true })
  email!: string
  @ApiProperty({ required: true })
  role!: UserRoleEnum
  @ApiProperty({ required: true })
  status!: UserStatusEnum
  @ApiProperty({ required: true })
  lastLogin?: Date
  @ApiProperty({ required: true })
  createdAt!: Date
  @ApiProperty({ required: true })
  updatedAt!: Date
  @ApiProperty({ required: true })
  emailVerified?: boolean

  constructor(getMePresenter: GetMePresenter) {
    Object.assign(this, getMePresenter)
  }
}
