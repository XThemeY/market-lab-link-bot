import { isValidUrl } from '@core/helpers/isValidUrl.helper';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

export const ValidateUrl = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const telegrafContext = ctx.switchToHttp().getRequest<Context>();

  const { text } = telegrafContext.message as Message.TextMessage;

  if (!text) {
    return { error: 'Сообщение пустое' };
  }

  // Извлекаем URL и Title, удаляя лишние пробелы из описания
  const [url, ...rest] = text.replace(/\s+/g, ' ').trim().split(' ');
  const title = rest.join(' ');

  if (!isValidUrl(url)) {
    return { error: 'Невалидная ссылка. Пожалуйста, отправьте корректный URL.' };
  }

  if (!title) {
    return { error: 'Не указано описание. Пожалуйста, отправьте описание ссылки.' };
  }

  if (title.length > 100) {
    return {
      error: `Количество символов превышено на ${title.length - 1}. Пожалуйста, отправьте корректное описание ссылки.`
    };
  }

  return { url, title };
});
