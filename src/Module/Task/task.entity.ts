import { User } from "src/Module/User/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({type: 'datetime', nullable: true})
    completedAt: Date;

    @ManyToOne(() => User , user=> user.tasks, {onDelete: 'CASCADE'})
    user: User;

}