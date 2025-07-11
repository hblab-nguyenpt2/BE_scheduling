import { Injectable } from '@nestjs/common'

import { AbilityBuilder, PureAbility } from '@casl/ability'

import { TAction, TSubject } from '@domain/entities/permission.entity'
import { UserRoleEnum } from '@domain/entities/role.entity'
import { UserEntity } from '@domain/entities/user.entity'
import {
  IAbilityFactory,
  IPolicyHandler,
} from '@domain/services/ability.interface'

type TAppAbility = PureAbility<[TAction, TSubject]>

@Injectable()
export class CaslAbilityFactory implements IAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<TAppAbility>(PureAbility)

    if (user.role === UserRoleEnum.ADMIN) {
      // Admin can manage all resources
      can('manage', 'all')
      can(['approve', 'reject'], 'User', { role: UserRoleEnum.PROVIDER })
      can('search', 'User')
    } else if (user.role === UserRoleEnum.PROVIDER) {
      can(['read', 'create', 'delete', 'update'], 'User', { id: user.id })
      cannot('update', 'User', ['role', 'status'])
      can('manage', 'Appointment', { providerId: user.id })
      can('manage', 'Service', { providerId: user.id })
      can('manage', 'Promotion', { providerId: user.id })
    } else if (user.role === UserRoleEnum.CLIENT) {
      // Client can manage their own resources
      can(['read', 'create', 'delete', 'update'], 'User', { id: user.id })
      cannot('update', 'User', ['role', 'status'])
      can('manage', 'Appointment', { clientId: user.id })
      can('manage', 'Notification', { userId: user.id })
      can('read', 'Category', { userId: user.id })
      can('read', 'Service', { providerId: user.id })
      can('read', 'Promotion', { userId: user.id })
      can('manage', 'Review', { clientId: user.id })
      can(['read', 'create', 'delete'], 'ServiceFavorite', {
        clientId: user.id,
      })
    }

    return build({
      conditionsMatcher: (conditions: unknown) => {
        return (object: Record<string, unknown>) => {
          if (
            typeof conditions !== 'object' ||
            conditions === null ||
            Array.isArray(conditions)
          ) {
            return false
          }

          const conds = conditions as Record<string, unknown>

          for (const [key, value] of Object.entries(conds)) {
            if (object[key] !== value) {
              return false
            }
          }
          return true
        }
      },
      fieldMatcher: (fields: string[]) => (accessibleField: string) =>
        fields.includes(accessibleField),
    })
  }

  can(
    ability: TAppAbility,
    { action, subject, field }: IPolicyHandler,
  ): boolean {
    return ability.can(action, subject, field)
  }
}
