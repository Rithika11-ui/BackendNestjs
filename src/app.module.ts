import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptModule } from './Module/Receipt/receipt.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './Module/orders/orders.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '661000Ting',
      database: 'receipts',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    ReceiptModule,
    NotificationsModule,
    OrdersModule,
    CoreModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
