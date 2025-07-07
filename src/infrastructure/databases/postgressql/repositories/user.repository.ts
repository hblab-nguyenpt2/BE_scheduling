import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Like, Repository } from 'typeorm'

import { UserEntity } from '@domain/entities/user.entity'
import { IUserRepositoryInterface } from '@domain/repositories/user.repository.interface'

import { RegisterDto } from '@adapters/controllers/auth/dto/register.dto'

import { User } from '../entities/user.entity'

const DEFAULT_SELECT_FIELDS: (keyof User)[] = [
  'id',
  'username',
  'status',
  'role',
  'email',
  'lastLogin',
]

@Injectable()
export class UserRepository implements IUserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async getUserByUsername(username: string) {
    return await this.userEntityRepository.findOne({
      where: {
        username,
      },
    })
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userEntityRepository.findOne({
      where: {
        email,
      },
    })
  }

  async getUserById(id: number) {
    return await this.userEntityRepository.findOne({
      where: {
        id,
      },
    })
  }

  async updateLastLogin(id: number) {
    await this.userEntityRepository.update(
      {
        id,
      },
      { lastLogin: () => 'CURRENT_TIMESTAMP' },
    )
  }

  async createUser(user: RegisterDto): Promise<UserEntity> {
    const newUser = this.userEntityRepository.create(user)
    return await this.userEntityRepository.save(newUser)
  }

  async findUsers({
    userId,
    status,
    role,
    size = 10,
    email,
    username,
  }: {
    status?: number
    role?: number
    size?: number
    email?: string
    username?: string
    userId: number
  }): Promise<UserEntity[]> {
    const filters: Record<string, any> = {}

    if (status !== undefined) filters.status = status
    if (role !== undefined) filters.role = role
    if (email !== undefined)
      filters.email = email !== '' ? Like(`%${email}%`) : undefined
    if (username !== undefined)
      filters.username = username !== '' ? Like(`%${username}%`) : undefined

    return this.userEntityRepository.find({
      where: filters,
      select: DEFAULT_SELECT_FIELDS,
      order: { id: 'DESC' },
      take: size,
    })
  }
}
