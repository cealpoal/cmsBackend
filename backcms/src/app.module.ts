import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerlinService } from './services/merlin/merlin.service';
import { BaseService } from './services/base/base.service';
import { GalleryService } from './services/gallery/gallery.service';
import { GalleryController } from './controller/gallery/gallery.controller';
import { MerlinController } from './controller/merlin/merlin.controller';
import { NewsController } from './controller/news/news.controller';
import { NewsService } from './services/news/news.service';
import { CommonsService } from './services/commons/commons.service';

@Module({
  imports: [],
  controllers: [AppController, MerlinController, GalleryController, NewsController],
  providers: [AppService, MerlinService, BaseService, GalleryService, NewsService, CommonsService],
})
export class AppModule {}
