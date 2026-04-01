import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateReceipDto } from "src/dto/create-receipt.dto";
import { UpdateReceiptDto } from "src/dto/update-receipt.dto";
import { Repository } from "typeorm";
import { Receipt } from "../../db/receipt.entity";
import { NotificationsService } from './../../notifications/notifications.service';


@Injectable()
export class ReceiptsService{
    constructor(
        @InjectRepository(Receipt)
        private readonly receiptsRepo: Repository<Receipt>, 
        private readonly notifications: NotificationsService,
    ) { }
    
    async findAll() {
        return this.receiptsRepo.find({ order: { issuedAt: 'DESC' } });
    }

    async findOne(receiptId: string) {
        const receipt = await this.receiptsRepo.findOne({ where: { receiptId } });
        if (!receipt) throw new NotFoundException('Receipt not found.')
        return receipt;
    }
    
    async create(dto: CreateReceipDto) {
        const receipt = this.receiptsRepo.create({
            issuedAt: new Date(dto.issuedAt),
            name: dto.name,
            price: dto.price,
        })

        const saved = await this.receiptsRepo.save(receipt);

        this.notifications.notify('receipt_created', {
            receiptId: saved.receiptId,
            price:saved.price,
        })

        return saved;
    }

    async update(receiptId: string, dto: UpdateReceiptDto) {
        const receipts = await this.findOne(receiptId);

        if (dto.issuedAt !== undefined) receipts.issuedAt = new Date(dto.issuedAt);
        if (dto.name !== undefined) receipts.name = dto.name;
        if (dto.price !== undefined) receipts.price = dto.price;

        return this.receiptsRepo.save(receipts);
    }

    async delete(receiptId: string) {
        const receipt = await this.findOne(receiptId);
        await this.receiptsRepo.remove(receipt);
        return {delete: true , receiptId}
    }
}