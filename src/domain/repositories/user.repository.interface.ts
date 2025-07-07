import { UserRoleEnum } from '@domain/entities/role.entity'
import { UserStatusEnum } from '@domain/entities/status.entity'
import { UserEntity } from '@domain/entities/user.entity'

import { RegisterDto } from '@adapters/controllers/auth/dto/register.dto'

export interface ISearchUsersParams {
  status?: UserStatusEnum
  role?: UserRoleEnum
  size?: number
  email?: string
  username?: string
}

export const USER_REPOSITORY = 'USER_REPOSITORY_INTERFACE'
export interface IUserRepositoryInterface {
  getUserByUsername(username: string): Promise<UserEntity | null>
  getUserByEmail(email: string): Promise<UserEntity | null>
  getUserById(id: number): Promise<UserEntity | null>
  updateLastLogin(id: number): Promise<void>
  createUser(user: RegisterDto): Promise<UserEntity>
  findUsers(
    queryParams: ISearchUsersParams & { userId: number },
  ): Promise<UserEntity[]>
}
