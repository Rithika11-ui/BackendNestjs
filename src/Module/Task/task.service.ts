import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  create(data: Partial<Task>) {
    const task = this.taskRepo.create(data);
    return this.taskRepo.save(task);
  }

  findAll() {
    return this.taskRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, data: Partial<Task>) {
    await this.taskRepo.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.taskRepo.delete(id);
  }
}