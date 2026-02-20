import { TypeOrmModule } from "@nestjs/typeorm";
import Module from "module";
import { Task } from "src/Task/task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UserModule {}
