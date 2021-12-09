import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from './order-details.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('order_userId_index')
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails[];
}
