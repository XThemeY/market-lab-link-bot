import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import { session } from 'telegraf';

export default (): TelegrafModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      token: configService.get('TELEGRAM_BOT_TOKEN'),
      middlewares: [session()]
    }),
    inject: [ConfigService],
    imports: [ConfigModule]
  };
};
