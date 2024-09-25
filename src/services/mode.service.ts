import { Injectable } from '@nestjs/common';
import { BotContext, UrlDataType } from '../libs/interfaces';
import { LinksService } from '../features/links/links.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ModeService {
  private maxDescLength: number;
  constructor(
    private readonly linksService: LinksService,
    private readonly configService: ConfigService
  ) {
    this.maxDescLength = this.configService.get('DESC_MAX_LENGTH');
  }

  async setSaveMode(ctx: BotContext) {
    ctx.session.type = 'saveLink';
    await ctx.reply(
      `Вы в режиме сохранения ссылки, пожалуйста введите ссылку и описание (описание не больше ${this.maxDescLength} символов)!`
    );
  }

  async setGetMode(ctx: BotContext) {
    ctx.session.type = 'getLink';
    await ctx.reply('Вы в режиме получения ссылки, пожалуйста введите уникальный код ссылки!');
  }

  async setDeleteMode(ctx: BotContext) {
    ctx.session.type = 'deleteLink';
    await ctx.reply('Вы в режиме удаления, пожалуйста введите уникальный код ссылки!');
  }

  async listLinks(ctx: BotContext) {
    const links = await this.linksService.getAllLinks();
    const message = links.map((link) => `${link.title}: ${link.id}`).join('\n');
    await ctx.reply(message || 'Ссылок нет');
  }

  async handleTextMessage(ctx: BotContext, message: string, urlData: UrlDataType) {
    try {
      if (ctx.session.type === 'getLink') {
        await this.getLink(ctx, message);
      } else if (ctx.session.type === 'deleteLink') {
        await this.deleteLink(ctx, message);
      } else if (ctx.session.type === 'saveLink') {
        await this.saveLink(ctx, urlData);
      } else {
        await ctx.reply('Пожалуйста выберите режим бота или введите команду /start');
      }
    } catch (error) {
      await ctx.reply(error.message);
    }
  }

  private async getLink(ctx: BotContext, message: string) {
    const link = await this.linksService.getLinkById(message);
    await ctx.reply(`Ссылка c id: ${message}\n${link.title}\n${link.url}`);
  }

  private async saveLink(ctx: BotContext, urlData: UrlDataType) {
    const userId = ctx.from.id.toString();
    if (!urlData.error) {
      const linkId = await this.linksService.saveLink(urlData, userId);
      await ctx.reply(`Ссылка ${urlData.url} - ${urlData.title} сохранена!\nУникальный код:\n${linkId}`);
    } else {
      await ctx.reply(`${urlData.error}`);
    }
  }

  private async deleteLink(ctx: BotContext, message: string) {
    const userId = ctx.from.id.toString();
    await this.linksService.deleteLink(message, userId);
    await ctx.reply('Ссылка удалена!');
  }
}
