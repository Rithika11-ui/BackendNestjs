import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Receipt } from "../../db/receipt.entity";
import { ReceiptController } from "./receipt.controller";
import { ReceiptsService } from "./receipt.service";

@Module({
    imports: [TypeOrmModule.forFeature([Receipt])],
    controllers: [ReceiptController],
    providers: [ReceiptsService],
})

export class ReceiptModule {}
