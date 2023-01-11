import { CreateDateColumn, Entity, PrimaryGeneratedColumn, BaseEntity, Column, UpdateDateColumn } from "typeorm";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    title!: string
}
