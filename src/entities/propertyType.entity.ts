import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Property } from './property.entity';

@Entity()
export class PropertyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  //  @OneToMany(() => Property, (property) => property.type)
  //  properties: Property[];
}
