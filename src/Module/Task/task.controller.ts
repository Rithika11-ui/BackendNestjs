import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // CREATE TASK
  @Post()
  create(@Body() createTaskDto: Partial<Task>) {
    return this.tasksService.create(createTaskDto);
  }

  // GET ALL TASKS
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // GET TASK BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  // UPDATE TASK
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<Task>,
  ) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  // DELETE TASK
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}