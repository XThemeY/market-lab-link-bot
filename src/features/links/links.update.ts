import { Ctx, Start, Update, Hears, On, Message } from 'nestjs-telegraf';
import { BotContext, UrlDataType } from '@libs/interfaces';
import { endPoints } from '@core/configs/endPoints.config';
import { MainKeyboard } from '@core/keyboards/links.buttons';
import { ModeService } from '@services/mode.service';
import { ValidateUrl } from '@core/decorators/isValidUrl.decorator';

@Update()
export class LinksUpdate {
  constructor(
    private readonly mainKeyboard: MainKeyboard,
    private readonly modeService: ModeService
  ) {}

  @Start()
  async onStart(@Ctx() ctx: BotContext) {
    await this.modeService.setSaveMode(ctx);
    this.mainKeyboard.getButtons();
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
