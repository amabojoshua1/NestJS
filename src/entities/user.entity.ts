import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'https://example.com/default-avatar.png' })
  avatarUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 'pwd4321' })
  password: string;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  @ManyToMany(() => Property, (property) => property.likedByUsers)
  @JoinTable({ name: 'user_liked_properties' })
  likedProperties: Property[];

  // Triggered before insert
  @BeforeInsert()
  async hashPassword() {
    // this.password = await bcrypt.hash(this.password, 10)
    this.password = await bcrypt.hash(this.password, 10);
  }
}
