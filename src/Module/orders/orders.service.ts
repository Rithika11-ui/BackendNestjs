import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class OrdersService {
  private orders: { id: string; dto: CreateOrderDto }[] = []; 

  constructor(
    @Inject('ORDERS_SERVICE') private client: ClientProxy,
    private readonly notifications: NotificationsService,
  ) {}

  createOrder(orderDto: CreateOrderDto) {
    const id = crypto.randomUUID();
    this.orders.push({ id, dto: orderDto });

    this.client.emit('order_created', {
      order: orderDto,
      createdAt: new Date().toISOString(),
    });

    this.notifications.notify('order_created', { order: orderDto });

    return { status: 'Order accepted', id, order: orderDto };
  }

  findAll() {
    return this.orders;
  }

  findOne(id: string) {
    const order = this.orders.find(o => o.id === id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  updateOrder(id: string, dto: UpdateOrderDto) {
    const order = this.findOne(id);
    Object.assign(order.dto, dto);
    this.notifications.notify('order_updated', { id, order: order.dto });
    return { status: 'Order updated', id, order: order.dto };
  }

  deleteOrder(id: string) {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) throw new NotFoundException(`Order ${id} not found`);
    this.orders.splice(index, 1);
    this.notifications.notify('order_deleted', { id });
    return { status: 'Order deleted', id };
  }
}