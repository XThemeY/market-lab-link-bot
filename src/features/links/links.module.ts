import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksUpdate } from './links.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { MainKeyboard } from '../../core/keyboards/links.buttons';
import { ModeService } from '../../services/mode.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [],
  providers: [LinksService, LinksUpdate, MainKeyboard, ModeService]
})
export class LinksModule {}
