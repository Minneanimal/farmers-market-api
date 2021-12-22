import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  ) {}

  async create(createKitchenDto: CreateKitchenDto, ownerId: number) {
    const owner = await User.findOne(ownerId);
    try {
      const createdKitchen = this.kitchenRepository.create({
        ...createKitchenDto,
        owner,
      });
      await this.kitchenRepository.save(createdKitchen);
      return createdKitchen;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'Kitchen with that name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getByName(name: string) {
    const kitchen = await this.kitchenRepository.findOne({ name });
    if (kitchen) {
      return kitchen;
    }
    throw new HttpException(
      'Kitchen with this name does not exist',
      HttpStatus.NOT_FOUND,
    );
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
