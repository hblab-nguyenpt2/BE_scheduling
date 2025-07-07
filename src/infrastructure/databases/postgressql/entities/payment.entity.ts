import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import {
  PaymentMethodEnum,
  PaymentStatusEnum,
} from '@domain/entities/payment.entity'

import { Appointment } from './appointment.entity'

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    primaryKeyConstraintName: 'PK_payments_id',
  })
  public readonly id!: number

  @Column({ type: 'int', name: 'appointment_id' })
  public appointmentId!: number

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'stripe_payment_id',
  })
  public stripePaymentId!: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'stripe_session_id',
  })
  public stripeSessionId!: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public amount!: number

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  public currency!: string

  @Column({
    type: 'smallint',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.PENDING,
  })
  public status!: PaymentStatusEnum

  @Column({
    type: 'smallint',
    enum: PaymentMethodEnum,
    default: PaymentMethodEnum.STRIPE,
    name: 'payment_method',
  })
  public paymentMethod!: PaymentMethodEnum

  @Column({ type: 'timestamp', nullable: true, name: 'payment_date' })
  public paymentDate!: Date

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    name: 'refund_amount',
  })
  public refundAmount!: number

  @Column({ type: 'timestamp', nullable: true, name: 'refund_date' })
  public refundDate!: Date

  @CreateDateColumn({ name: 'created_at' })
  public readonly createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  public readonly updatedAt!: Date

  // Relations
  @ManyToOne(() => Appointment, (appointment) => appointment.payments)
  @JoinColumn({ name: 'appointment_id' })
  public appointment!: Appointment
}
