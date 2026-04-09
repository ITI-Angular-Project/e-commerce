import { OrderItem } from './order-item.model';

export interface Order {
  id: string;
  orderNumber: string;
  datePlaced: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  userId: number | undefined;
}
