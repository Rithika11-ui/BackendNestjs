import { Task } from "src/Task/task.entity";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
     @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column ({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(()=> Task , task => task.user)
    tasks: Task[];

}