import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn('uuid')
    receiptId: string;

    @Column()
    issuedAt: Date;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
}