import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { TribeController } from './tribe.controller';
import { TribeService } from './tribe.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TribeController],
  providers: [TribeService],
  exports: [TribeService],
})
export class TribeModule {}
