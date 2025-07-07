import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { AppointmentStatusEnumn } from '@domain/entities/appointment.entity'

import { Payment } from './payment.entity'
import { PromotionUsage } from './promotion-usage.entity'
import { Review } from './review.entity'
import { Service } from './service.entity'
import { User } from './user.entity'

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    primaryKeyConstraintName: 'PK_appointments_id',
  })
  public readonly id!: number

  @Column({ type: 'int', name: 'client_id' })
  public clientId!: number

  @Column({ type: 'int', name: 'provider_id' })
  public providerId!: number

  @Column({ type: 'int', name: 'service_id' })
  public serviceId!: number

  @Column({ type: 'date', name: 'appointment_date' })
  public appointmentDate!: Date

  @Column({ type: 'time', name: 'appointment_time' })
  public appointmentTime!: string

  @Column({ type: 'int' })
  public duration!: number

  @Column({
    type: 'enum',
    enum: AppointmentStatusEnumn,
    default: AppointmentStatusEnumn.PENDING,
  })
  public status!: AppointmentStatusEnumn

  @Column({ type: 'text', nullable: true })
  public notes!: string

  @Column({ type: 'text', nullable: true, name: 'cancellation_reason' })
  public cancellationReason!: string

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_amount' })
  public totalAmount!: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'commission_amount',
  })
  public commissionAmount!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'provider_amount' })
  public providerAmount!: number

  @CreateDateColumn({ name: 'created_at' })
  public readonly createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  public readonly updatedAt!: Date

  // Relations
  @ManyToOne(() => User, (user) => user.clientAppointments)
  @JoinColumn({ name: 'client_id' })
  public client!: User

  @ManyToOne(() => User, (user) => user.providerAppointments)
  @JoinColumn({ name: 'provider_id' })
  public provider!: User

  @ManyToOne(() => Service, (service) => service.appointments)
  @JoinColumn({ name: 'service_id' })
  public service!: Service

  @OneToMany(() => Payment, (payment) => payment.appointment)
  public payments!: Payment[]

  @OneToOne(() => Review, (review) => review.appointment)
  public review!: Review

  @OneToMany(() => PromotionUsage, (usage) => usage.appointment)
  public promotionUsages!: PromotionUsage[]
}
