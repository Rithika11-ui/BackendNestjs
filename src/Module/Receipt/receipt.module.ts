import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Receipt } from "../../db/receipt.entity";
import { ReceiptController } from "./receipt.controller";
import { ReceiptsService } from "./receipt.service";
import { NotificationsModule } from "src/notifications/notifications.module";

@Module({
    imports: [TypeOrmModule.forFeature([Receipt]), NotificationsModule],
    controllers: [ReceiptController],
    providers: [ReceiptsService],
    
})

export class ReceiptModule {}
