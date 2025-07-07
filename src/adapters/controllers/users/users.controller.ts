import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { getMetadataArgsStorage } from 'typeorm'

import { UserEntity } from '@domain/entities/user.entity'
import { IAbilityFactory } from '@domain/services/ability.interface'

import { GetListUsersUseCase } from '@use-cases/users/get-list-users.use-case'

import { CheckPolicies } from '../common/decorators/check-policies.decorator'
import {
  ApiCreatedResponseType,
  ApiResponseType,
} from '../common/decorators/swagger-response.decorator'
import { User } from '../common/decorators/user.decorator'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { PoliciesGuard } from '../common/guards/policies.guard'
import { GetListUsersDto } from './dto/get-list-users.dto'
import { AdminUpdateUserDto, UpdateUserDto } from './dto/update-users.dto'
import { GetListUserPresenter } from './presenters/get-list-users.presenter'

@Controller('users')
@ApiTags('Users')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 403, description: 'Forbidden access' })
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class UsersController {
  constructor(private readonly getListUserUseCase: GetListUsersUseCase) {}
  @Get('list')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List users for admin ',
    description: 'Only admin can access this endpoint',
  })
  @ApiResponseType(GetListUserPresenter, true)
  @CheckPolicies({ action: 'search', subject: 'User' })
  async findAll(
    @Query() querySearchParams: GetListUsersDto,
    @User('id') userId: number,
  ) {
    const users = await this.getListUserUseCase.execute({
      ...querySearchParams,
      userId: userId,
    })

    return users.map((user) => new GetListUserPresenter(user))
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user', description: 'Update a user' })
  @ApiOkResponse({ description: 'User updated' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @CheckPolicies({ action: 'update', subject: 'User' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
    @Body() adminFields: AdminUpdateUserDto,
    @User() user: UserEntity,
  ) {
    return { message: 'User updated successfully' }
  }
}
