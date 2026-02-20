import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './../User/user.module';
import { User } from "src/User/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TaskModule {}

export class UserModule {}