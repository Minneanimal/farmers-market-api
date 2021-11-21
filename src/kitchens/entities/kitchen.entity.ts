import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Kitchen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Product, (products) => products.kitchen)
  products: Product[];

  @OneToOne(() => User, (owner) => owner.kitchen, { cascade: true })
  @JoinColumn()
  owner: User;
}
