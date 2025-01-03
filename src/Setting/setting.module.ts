import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Setting } from '../models/Setting.model';

@Module({
  imports: [SequelizeModule.forFeature([Setting])],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
