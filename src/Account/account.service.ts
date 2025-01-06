import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from '../models/Account.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account)
    private accountModel: typeof Account,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const existing = await this.accountModel.findOne({
      where: { name: createAccountDto.name },
    });
    if (existing) {
      throw new BadRequestException('Account name already exists');
    }
    const createdAccount = await this.accountModel.create(createAccountDto);
    return {
      message: 'Account successfully created',
      data: createdAccount,
    };
  }

  // findAll() {
  //   return `This action returns all account`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} account`;
  // }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
