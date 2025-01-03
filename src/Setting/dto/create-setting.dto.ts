import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['string', 'number', 'boolean', 'json'], {
    message: 'dataType must be one of string, number, boolean, or json',
  })
  dataType: 'string' | 'number' | 'boolean' | 'json';

  @IsNumber()
  accountId: number;

  value: string | number | boolean | object;
}
