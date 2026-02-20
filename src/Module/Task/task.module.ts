import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './../User/user.module';
import { Task } from "./task.entity";
import { Module } from '@nestjs/common';
import { TasksController } from "./task.controller";
import { TasksService } from "./task.service";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TaskModule {}

