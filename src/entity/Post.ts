import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

}