import { ILink } from '@libs/interfaces';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link implements ILink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  userId: string;

  @Column({ default: false })
  isDeleted: boolean;
}
