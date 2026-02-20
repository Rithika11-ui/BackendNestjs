import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable() 
export class UsersService{
    constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    ) {}
    
    create(usersData: Partial<User>) {
        const user = this.usersRepo.create(usersData)
        return this.usersRepo.save(user);
    }

    findAll() {
        return this.usersRepo.find({ relations: ['tasks'] });
    }

    findOne(id: number) {
    return this.usersRepo.findOne({ where: { id }, relations: ['tasks'] });
  }

    async update(id: number, updateData: Partial<User>) {
        await this.usersRepo.update(id, updateData);
        return this.findOne(id);
    }

    remove(id: number) {
        return this.usersRepo.delete(id);
    }
}

