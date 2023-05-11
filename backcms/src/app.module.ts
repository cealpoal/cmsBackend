import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerlinService } from './services/merlin/merlin.service';
import { BaseService } from './services/base/base.service';
import { GalleryService } from './services/gallery/gallery.service';
import { GalleryController } from './controller/gallery/gallery.controller';
import { MerlinController } from './controller/merlin/merlin.controller';

@Module({
  imports: [],
  controllers: [AppController, MerlinController, GalleryController],
  providers: [AppService, MerlinService, BaseService, GalleryService],
})
export class AppModule {}
