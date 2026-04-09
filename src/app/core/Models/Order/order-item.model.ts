import { OrderItem } from './order.model';

export interface Order {
  id: string;
  orderNumber: string;
  datePlaced: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}
