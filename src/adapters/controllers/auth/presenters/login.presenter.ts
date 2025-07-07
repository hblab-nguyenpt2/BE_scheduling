import { ApiProperty } from '@nestjs/swagger'

export class LoginPresenter {
  @ApiProperty({ required: true })
  accessToken!: string

  @ApiProperty({ required: true })
  refreshToken!: string

  constructor(loginPresenter: LoginPresenter) {
    Object.assign(this, loginPresenter)
  }
}
