import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateKitchenDto } from './dto/create-kitchen.dto';
import { UpdateKitchenDto } from './dto/update-kitchen.dto';
import { Kitchen } from './entities/kitchen.entity';

@Injectable()
export class KitchensService {
  constructor(
    @InjectRepository(Kitchen)
    private kitchenRepository: Repository<Kitchen>,
    private userRespository: Repository<User>,
  ) {}

  async create(createKitchenDto: CreateKitchenDto, ownerId: number) {
    const owner = await this.userRespository.findOne(ownerId);
    const newKitchen = this.kitchenRepository.create({
      ...createKitchenDto,
      owner,
    });
    await this.kitchenRepository.save(newKitchen);

    return newKitchen;
  }

  findAll() {
    return `This action returns all kitchens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kitchen`;
  }

  update(id: number, updateKitchenDto: UpdateKitchenDto) {
    return `This action updates a #${id} kitchen`;
  }

  remove(id: number) {
    return `This action removes a #${id} kitchen`;
  }
}
