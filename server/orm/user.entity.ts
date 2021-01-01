import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date

  @Column()
  name: string

  @Column()
  email: string

  @Column({ nullable: true, unique: true })
  googleUserId?: string

  @Column({ nullable: true, unique: true })
  githubUserId?: string

  @Column({ nullable: true })
  avatar?: string
}
