import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinksModule } from './features/links/links.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import getDbConfig from './core/configs/db.config';
import { validateEnvConfig } from './core/configs/env-validation.config';
import { TelegrafModule } from 'nestjs-telegraf';
import getBotConfig from './core/configs/bot.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validate: validateEnvConfig
    }),
    TelegrafModule.forRootAsync(getBotConfig()),
    TypeOrmModule.forRootAsync(getDbConfig()),
    LinksModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
