import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EXCEPTIONS } from '@domain/exceptions/exceptions.interface'
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface'

import { GetListUsersUseCase } from '@use-cases/users/get-list-users.use-case'

import { UsersController } from '@adapters/controllers/users/users.controller'

import { User } from '@infrastructure/databases/postgressql/entities/user.entity'
import { UserRepository } from '@infrastructure/databases/postgressql/repositories/user.repository'
import { ExceptionsService } from '@infrastructure/exceptions/exceptions.service'
import { CaslModule } from '@infrastructure/services/casl/casl.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), CaslModule],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: EXCEPTIONS,
      useClass: ExceptionsService,
    },
    GetListUsersUseCase,
  ],
})
export class UsersModule {}
