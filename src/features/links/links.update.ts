import { Ctx, Start, Update, Hears, On, Message } from 'nestjs-telegraf';
import { BotContext, UrlDataType } from '../../libs/interfaces';
import { endPoints } from '../../core/configs/endPoints.config';
import { MainKeyboard } from '../../core/keyboards/links.buttons';
import { ModeService } from '../../services/mode.service';
import { ValidateUrl } from '../../core/decorators/isValidUrl.decorator';
import { ConfigService } from '@nestjs/config';

@Update()
export class LinksUpdate {
  constructor(
    private readonly mainKeyboard: MainKeyboard,
    private readonly modeService: ModeService,
    private readonly configService: ConfigService
  ) {}

  @Start()
  async onStart(@Ctx() ctx: BotContext) {
    ctx.session.type = 'saveLink';
    await ctx.reply(
      `Привет! Я бот для сохранения ссылок. Пожалуйста, введите ссылку и описание (описание не больше ${this.configService.get(
        'DESC_MAX_LENGTH'
      )} символов)!`,
      this.mainKeyboard.getButtons()
    );
  }

  @Hears(endPoints.saveLink)
  async setSaveMode(@Ctx() ctx: BotContext) {
    await this.modeService.setSaveMode(ctx);
  }

  @Hears(endPoints.getLink)
  async setGetMode(@Ctx() ctx: BotContext) {
    await this.modeService.setGetMode(ctx);
  }

  @Hears(endPoints.listLinks)
  async listLinks(@Ctx() ctx: BotContext) {
    await this.modeService.listLinks(ctx);
  }

  @Hears(endPoints.deleteLink)
  async setDeleteMode(@Ctx() ctx: BotContext) {
    await this.modeService.setDeleteMode(ctx);
  }

  @On('text')
  async getMessage(@Ctx() ctx: BotContext, @Message('text') message: string, @ValidateUrl() urlData: UrlDataType) {
    await this.modeService.handleTextMessage(ctx, message, urlData);
  }
}
