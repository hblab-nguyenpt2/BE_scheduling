// import { Inject, Injectable } from '@nestjs/common'

// import { UserEntity } from '@domain/entities/user.entity'
// import {
//   IUserRepositoryInterface,
//   USER_REPOSITORY,
// } from '@domain/repositories/user.repository.interface'

// @Injectable()
// export class UpdateUsersUseCase {
//   constructor(
//     @Inject(USER_REPOSITORY)
//     private readonly userRepository: IUserRepositoryInterface,
//   ) {}

//   async execute(
//     queryParams: IUpdateUsersParams & { userId: number },
//   ): Promise<UserEntity[]> {
//     console.log('Filters:', queryParams)
//     return await this.userRepository.findUsers(queryParams)
//   }
// }
