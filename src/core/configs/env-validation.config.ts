import { plainToInstance, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

//Функция валидации .env конфига
export function validateEnvConfig(config: Record<string, any>): EnvConfig {
  const validatedConfig = plainToInstance(EnvConfig, config);
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  if (errors.length) {
    const message = errors.map((err) => Object.values(err.constraints)).join('; ');
    throw new Error(`Configuration validation failed: ${message}`);
  }
  return validatedConfig;
}

//Класс для валидации конфига
class EnvConfig {
  @IsString()
  @IsNotEmpty({ message: 'NODE_ENV is required' })
  NODE_ENV: string;

  @IsString()
  @IsNotEmpty({ message: 'POSTGRES_HOST is required' })
  POSTGRES_HOST: string;

  @IsString()
  @IsNotEmpty({ message: 'POSTGRES_URL is required' })
  POSTGRES_URL: string;

  @Transform(({ value }) => +value || 5432, { toClassOnly: true })
  @IsNumber()
  @IsNotEmpty({ message: 'POSTGRES_PORT is required' })
  POSTGRES_PORT: number;

  @IsString()
  @IsNotEmpty({ message: 'POSTGRES_USER is required' })
  POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty({ message: 'POSTGRES_PASS is required' })
  POSTGRES_PASS: string;

  @IsString()
  @IsNotEmpty({ message: 'POSTGRES_DB_NAME is required' })
  POSTGRES_DB_NAME: string;

  @IsString()
  @IsNotEmpty({ message: 'TELEGRAM_BOT_TOKEN is required' })
  TELEGRAM_BOT_TOKEN: string;

  @Transform(({ value }) => +value || 100, { toClassOnly: true })
  @IsNumber()
  @IsNotEmpty({ message: 'DESC_MAX_LENGTH is required' })
  DESC_MAX_LENGTH: number;
}
