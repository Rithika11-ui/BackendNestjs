
import { IsDateString, IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
export class CreateReceipDto {
    @IsDateString()
    issuedAt: string;

    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNumber()
    @Min(0)
    price: number;
}