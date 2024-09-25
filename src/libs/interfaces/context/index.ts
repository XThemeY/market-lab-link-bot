import { Context } from 'telegraf';

export interface BotContext extends Context {
  session: {
    type?: SessionType;
  };
}

export type SessionType = 'getLink' | 'deleteLink' | 'saveLink';
