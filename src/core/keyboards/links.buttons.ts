import { Markup } from 'telegraf';
import { endPoints } from '@core/configs/endPoints.config';
import { Injectable } from '@nestjs/common';
import { IKeyboard } from '@libs/interfaces';

@Injectable()
export class MainKeyboard implements IKeyboard {
  getButtons() {
    return Markup.keyboard(
      [
        Markup.button.text(endPoints.saveLink),
        Markup.button.text(endPoints.getLink),
        Markup.button.text(endPoints.listLinks),
        Markup.button.text(endPoints.deleteLink)
      ],
      {
        columns: 2
      }
    ).resize();
  }
}
