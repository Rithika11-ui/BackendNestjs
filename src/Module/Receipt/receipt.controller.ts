import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ReceiptsService } from "./receipt.service";
import { CreateReceipDto } from './../../dto/create-receipt.dto';
import { UpdateReceiptDto } from "src/dto/update-receipt.dto";
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('receipts')
export class ReceiptController{
    
    constructor(private readonly receiptsService: ReceiptsService){}
    
    @Get()
    findAll() {
        return this.receiptsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.receiptsService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateReceipDto) {
        return this.receiptsService.create(dto); 
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateReceiptDto) {
        return this.receiptsService.update(id,dto);
    }

    @Delete(':id')
    delete(@Param('id')  id: string) {
        return this.receiptsService.delete(id);
    }
    
}