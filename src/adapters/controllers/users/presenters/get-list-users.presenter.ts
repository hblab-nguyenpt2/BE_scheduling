import { ApiProperty } from '@nestjs/swagger'

import { UserRoleEnum } from '@domain/entities/role.entity'
import { UserStatusEnum } from '@domain/entities/status.entity'

export class GetListUserPresenter {
  @ApiProperty()
  id!: number

  @ApiProperty()
  username!: string
  @ApiProperty()
  email!: string
  @ApiProperty()
  lastLogin!: Date

  @ApiProperty({
    required: true,
    enum: UserRoleEnum,
    description: '1: admin , 2: provider, 3: client',
  })
  role!: UserRoleEnum

  @ApiProperty({
    required: true,
    enum: UserRoleEnum,
    description: '1: active , 2: inactive, 3: peding, 4: banned',
  })
  status!: UserStatusEnum

  constructor(partial: Partial<GetListUserPresenter>) {
    Object.assign(this, partial)
  }
}
