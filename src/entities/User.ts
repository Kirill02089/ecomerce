import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  username!: string

  @Column({ nullable: true })
  email: string

  @Column()
  password!: string

  @Column({ width: 1, default: 1 })
  role: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true })
  phoneNumber: string

  @Column({ type: 'boolean', width: 1, default: 0 })
  verified: boolean

  @Column({ type: 'int', nullable: true, default: 1 })
  reputation: number

  @Column({ type: 'text', nullable: true })
  bio: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
