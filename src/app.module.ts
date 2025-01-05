import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModule } from './Account/account.module';
import { SettingModule } from './Setting/setting.module';
import { AuthenticationModule } from './Authentication/authentication.module';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_DEVELOPMENT,
      autoLoadModels: true,
      synchronize: false,
      define: {
        underscored: true,
      },
    }),
    AccountModule,
    SettingModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
