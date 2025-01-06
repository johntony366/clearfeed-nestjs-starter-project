import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Setting } from '../models/Setting.model';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting)
    private settingModel: typeof Setting,
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    this.validateValueType(createSettingDto);

    const createdSetting = await this.settingModel.create({
      ...createSettingDto,
      value:
        createSettingDto.dataType === 'json'
          ? JSON.stringify(createSettingDto.value)
          : createSettingDto.value.toString(),
    });

    return {
      message: 'Setting successfully created',
      data: createdSetting,
    };
  }

  async findAll() {
    const settings = await this.settingModel.findAll();
    return {
      message: 'Settings retrieved successfully',
      data: settings,
    };
  }

  async findOne(id: number) {
    const setting = await this.settingModel.findByPk(id);
    if (!setting) {
      throw new HttpException('Setting not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Setting retrieved successfully',
      data: setting,
    };
  }

  async update(id: number, updateSettingDto: UpdateSettingDto) {
    this.validateValueType(updateSettingDto);

    const [numberOfAffectedRows, [updatedSetting]] =
      await this.settingModel.update(
        {
          ...updateSettingDto,
          value: updateSettingDto.value as string,
        },
        {
          where: {
            id,
          },
          returning: true,
        },
      );

    if (numberOfAffectedRows === 0) {
      throw new HttpException('Setting not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Setting updated successfully',
      data: updatedSetting,
    };
  }

  async remove(id: number) {
    const deleted = await this.settingModel.destroy({
      where: {
        id,
      },
    });

    if (deleted === 0) {
      throw new HttpException('Setting not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Setting deleted successfully',
    };
  }

  private validateValueType(object: any) {
    const { value } = object;
    const { dataType } = object;

    if (
      (dataType === 'json' && typeof value === 'object') ||
      dataType === typeof value
    ) {
      return;
    } else {
      throw new HttpException(
        'The provided value type does not match the expected data type.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
