import { PublicFile } from 'src/files/entities/public-file.entity';
import { Kitchen } from 'src/kitchens/entities/kitchen.entity';
import { OrderDetails } from 'src/orders/entities/order-details.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Kitchen, (kitchen) => kitchen.products)
  kitchen: Kitchen;

  @OneToMany(() => PublicFile, (files) => files.product)
  files: PublicFile[];

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails;
}
