import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, default: '' })
  email: string;

  @Column()
  phone: string;
}
