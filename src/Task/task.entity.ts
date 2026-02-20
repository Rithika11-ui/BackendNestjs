import { User } from "src/User/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP'})
    cretaedAt: Date

    @Column({type: 'datetime', nullable: true})
    CompletedAt: Date;

    @ManyToOne(() => User , user=> user.tasks, {onDelete: 'CASCADE'})
    user: User;

}