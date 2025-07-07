import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { GetMeUseCase } from '@use-cases/auth/get-me.use-case'
import { LoginUseCase } from '@use-cases/auth/login.use-case'
import { RefreshUseCase } from '@use-cases/auth/refresh.use-case'
import { RegisterUseCase } from '@use-cases/auth/register.use-case'

import { ApiResponseType } from '../common/decorators/swagger-response.decorator'
import { User } from '../common/decorators/user.decorator'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import JwtRefreshGuard from '../common/guards/jwt-refresh.guard'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { GetMePresenter } from './presenters/get-me.presenter'
import { LoginPresenter } from './presenters/login.presenter'
import { RefreshPresenter } from './presenters/refresh.presenter'
import { RegisterPresenter } from './presenters/register.presenter'

@Controller('auth')
@ApiTags('Auth')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshUseCase,
    private readonly getMeUseCase: GetMeUseCase,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Login', description: 'Login a user' })
  @ApiExtraModels(LoginPresenter)
  @ApiResponseType(LoginPresenter, false)
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.loginUseCase.execute(loginDto)
    return new LoginPresenter(tokens)
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get new tokens',
    description: 'Get new access and refresh tokens using refresh token',
  })
  @ApiExtraModels(RefreshPresenter)
  @ApiResponseType(RefreshPresenter, false)
  async refresh(@User('id') userId: number) {
    const tokens = await this.refreshUseCase.execute({ userId })

    return new RefreshPresenter(tokens)
  }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiOperation({ summary: 'Register', description: 'Register a user' })
  @ApiExtraModels(RegisterPresenter)
  @ApiResponseType(RegisterPresenter, false)
  async register(@Body() registerDto: RegisterDto) {
    const tokens = await this.registerUseCase.execute(registerDto)
    return new RegisterPresenter(tokens)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get profile  by tokens',
    description: 'Get user profile using access token',
  })
  @ApiExtraModels(GetMePresenter)
  @ApiResponseType(GetMePresenter, false)
  async getProfile(@User('id') userId: number) {
    const tokens = await this.getMeUseCase.execute({ userId })

    return new GetMePresenter(tokens)
  }
}
