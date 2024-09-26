import { Link } from '../../features/links/entities/link.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      url: configService.get('DATABASE_URL'),
      type: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: configService.get<number>('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASS'),
      database: configService.get('POSTGRES_DB_NAME'),
      entities: [Link],
      synchronize: true
    }),
    inject: [ConfigService],
    imports: [ConfigModule]
  };
};
