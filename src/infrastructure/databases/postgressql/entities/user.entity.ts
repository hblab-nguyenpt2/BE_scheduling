import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { UserRoleEnum } from '@domain/entities/role.entity'
import { UserStatusEnum } from '@domain/entities/status.entity'
import { UserEntity } from '@domain/entities/user.entity'

import { Appointment } from './appointment.entity'
import { ChatConversation } from './chat-conversation.entity'
import { ChatMessage } from './chat-mesage.entity'
import { FavoriteService } from './favorite-service.entity'
import { Notification } from './notification.entity'
import { PromotionUsage } from './promotion-usage.entity'
import { Promotion } from './promotion.entity'
import { ProviderAvailability } from './provider-availability.entity'
import { ProviderBreak } from './provider-breeak.entity'
import { ProviderProfile } from './provider-profile.entity'
import { Review } from './review.entity'
import { Service } from './service.entity'

@Entity('users')
@Index('IDX_users_email', ['email'], { unique: true })
export class User implements UserEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    primaryKeyConstraintName: 'PK_users_id',
  })
  public readonly id!: number

  @Column('varchar', { length: 255 })
  public username!: string

  @Column('varchar', { length: 255 })
  public email!: string

  @Column('text')
  password!: string

  @Column('smallint', { default: UserRoleEnum.CLIENT })
  public role!: UserRoleEnum

  @Column('smallint', { default: UserStatusEnum.ACTIVE })
  public status!: UserStatusEnum

  @Column('varchar', { name: 'email_verified', length: 255 })
  public emailVerified!: boolean

  @Column('timestamp', { name: 'last_login', nullable: true })
  public lastLogin?: Date

  @CreateDateColumn({ name: 'created_at' })
  public readonly createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  public readonly updatedAt!: Date

  // Relations
  @OneToOne(() => ProviderProfile, (profile) => profile.user)
  public providerProfile!: ProviderProfile

  @OneToMany(() => Service, (service) => service.provider)
  public services!: Service[]

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  public clientAppointments!: Appointment[]

  @OneToMany(() => Appointment, (appointment) => appointment.provider)
  public providerAppointments!: Appointment[]

  @OneToMany(() => Review, (review) => review.client)
  public clientReviews!: Review[]

  @OneToMany(() => Review, (review) => review.provider)
  public providerReviews!: Review[]

  @OneToMany(() => Promotion, (promotion) => promotion.provider)
  public promotions!: Promotion[]

  @OneToMany(() => PromotionUsage, (usage) => usage.client)
  public promotionUsages!: PromotionUsage[]

  @OneToMany(() => FavoriteService, (favorite) => favorite.client)
  public favoriteServices!: FavoriteService[]

  @OneToMany(() => Notification, (notification) => notification.user)
  public notifications!: Notification[]

  @OneToMany(() => ChatConversation, (conversation) => conversation.client)
  public clientConversations!: ChatConversation[]

  @OneToMany(() => ChatConversation, (conversation) => conversation.provider)
  public providerConversations!: ChatConversation[]

  @OneToMany(() => ChatMessage, (message) => message.sender)
  public sentMessages!: ChatMessage[]

  @OneToMany(
    () => ProviderAvailability,
    (availability) => availability.provider,
  )
  public availability!: ProviderAvailability[]

  @OneToMany(() => ProviderBreak, (providerBreak) => providerBreak.provider)
  public breaks!: ProviderBreak[]
}
