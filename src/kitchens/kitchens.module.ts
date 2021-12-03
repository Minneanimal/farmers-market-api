import { Module } from '@nestjs/common';
import { KitchensService } from './kitchens.service';
import { KitchensController } from './kitchens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kitchen } from './entities/kitchen.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Kitchen]), UsersModule],
  exports: [KitchensService],
  controllers: [KitchensController],
  providers: [KitchensService],
})
export class KitchensModule {}
