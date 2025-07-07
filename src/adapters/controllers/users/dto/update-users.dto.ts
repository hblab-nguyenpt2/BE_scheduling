// update-user.dto.ts
import { OmitType, PartialType, PickType } from '@nestjs/swagger'

import { RegisterDto } from '@adapters/controllers/auth/dto/register.dto'

export class UpdateUserDto extends PartialType(
  OmitType(RegisterDto, ['role', 'status'] as const),
) {}

export class AdminUpdateUserDto extends PickType(RegisterDto, [
  'role',
  'status',
] as const) {}
