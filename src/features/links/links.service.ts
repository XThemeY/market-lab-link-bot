import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>
  ) {}

  async saveLink(url: { url: string; title: string }, userId: string) {
    const newLink = this.linkRepository.create({ url: url.url, title: url.title, userId });
    const savedLink = await this.linkRepository.save(newLink);
    return savedLink.id;
  }

  async getLinkById(id: string): Promise<Link> {
    if (!isUUID(id)) {
      throw new Error('Пожалуйста, введите валидный уникальный код!');
    }
    const link = await this.linkRepository.findOne({ where: { id, isDeleted: false } });
    if (!link) {
      throw new Error('Ссылка не найдена');
    }
    return link;
  }

  async deleteLink(id: string, userId: string): Promise<void> {
    if (!isUUID(id)) {
      throw new Error('Пожалуйста, введите валидный уникальный код!');
    }
    const link = await this.linkRepository.findOne({ where: { id, userId, isDeleted: false } });
    if (!link) {
      throw new Error('Ссылка не найдена или не принадлежит вам');
    }
    link.isDeleted = true;
    await this.linkRepository.save(link);
  }

  async getAllLinks(): Promise<Link[]> {
    return this.linkRepository.find({ where: { isDeleted: false } });
  }
}
