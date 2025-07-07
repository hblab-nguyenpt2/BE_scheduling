import { Inject, Injectable } from '@nestjs/common'

import { UserRoleEnum } from '@domain/entities/role.entity'
import { UserStatusEnum } from '@domain/entities/status.entity'
import { EXCEPTIONS, IException } from '@domain/exceptions/exceptions.interface'
import {
  IUserRepositoryInterface,
  USER_REPOSITORY,
} from '@domain/repositories/user.repository.interface'
import {
  BCRYPT_SERVICE,
  IBcryptService,
} from '@domain/services/bcrypt.interface'

import { RegisterDto } from '@adapters/controllers/auth/dto/register.dto'

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(BCRYPT_SERVICE)
    private readonly bcryptService: IBcryptService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepositoryInterface,
    @Inject(EXCEPTIONS)
    private readonly exceptionsService: IException,
  ) {}

  async execute(payload: RegisterDto) {
    const user = await this.userRepository.getUserByEmail(payload.email)
    if (user)
      throw this.exceptionsService.badRequestException({
        type: 'BadRequest',
        message: 'User have existed ',
      })

    const passwordMatches = await this.bcryptService.hash(payload.password)

    const newUser = await this.userRepository.createUser({
      username: payload.username,
      email: payload.email,
      password: passwordMatches,
      role: payload.role || UserRoleEnum.CLIENT,
      status: UserStatusEnum.INACTIVE,
      emailVerified: false,
    })

    return {
      message: 'User registered successfully',
    }
  }
}
