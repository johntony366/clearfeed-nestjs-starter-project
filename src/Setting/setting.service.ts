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

  create(createSettingDto: CreateSettingDto) {
    if (!this.validateValueType(createSettingDto)) {
      throw new HttpException(
        'The provided value type does not match the expected data type.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.settingModel.create({
      ...createSettingDto,
      value: createSettingDto.value as string,
    });
  }

  findAll() {
    return this.settingModel.findAll();
  }

  findOne(id: number) {
    return this.settingModel.findByPk(id);
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    if (!this.validateValueType(updateSettingDto)) {
      throw new HttpException(
        'The provided value type does not match the expected data type.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.settingModel.update(
      {
        ...updateSettingDto,
        value: updateSettingDto.value as string,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  remove(id: number) {
    return this.settingModel.destroy({
      where: {
        id,
      },
    });
  }

  private validateValueType(object: any) {
    const { value } = object;
    const { dataType } = object;

    if (dataType === 'string' && typeof value !== 'string') {
      return false;
    }

    if (dataType === 'number' && typeof value !== 'number') {
      return false;
    }

    if (dataType === 'boolean' && typeof value !== 'boolean') {
      return false;
    }

    if (dataType === 'json') {
      try {
        if (typeof value === 'string') {
          JSON.parse(value); // Validates stringified JSON
        } else if (typeof value !== 'object') {
          return false; // Only valid objects or valid JSON string are accepted
        } else {
          object.value = JSON.stringify(value); // Stringify object
        }
      } catch {
        return false;
      }
    }

    return true;
  }
}
