import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyFeature } from './propertyFeature.entity';
import { User } from './user.entity';
import { JoinColumn } from 'typeorm';
import { PropertyType } from './propertyType.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column({ nullable: true })
  address: string;

  @OneToOne(
    () => PropertyFeature,
    (propertyFeature) => propertyFeature.property,
    { cascade: true }, // eager: true
  )
  propertyFeature: PropertyFeature;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'OwnerId' })
  user: User;

  @ManyToMany(() => User, (user) => user.likedProperties)
  likedByUsers: User[];

  @ManyToOne(() => PropertyType)
  type: PropertyType;
}
