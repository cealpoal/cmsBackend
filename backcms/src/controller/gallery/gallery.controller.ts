import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { galleryRequest, sessionRequest } from 'src/dto/requests';
import { GalleryService } from 'src/services/gallery/gallery.service';

@Controller('gallery')
export class GalleryController {
    constructor(private gallery:GalleryService){}

    @Get()
    async get(@Body() user: sessionRequest){
        return this.gallery.GetGallery(user).then(data => { return data });
    }

    @Get(':fileId')
    async getPhoto(@Param("fileId") fileId:string, @Body('user') user: sessionRequest){
        return this.gallery.GetPhoto(user,fileId).then(data => { return data });
    }

    @Post()
    async post(@Body('user') user: sessionRequest,@Body('data') data: galleryRequest[]){
        return this.gallery.PostGallery(user,data).then(data => { return data });
    }

    @Put(':fileId')
    async put(@Param("fileId") fileId:string, @Body('user') user: sessionRequest, @Body('data') data ){
        return this.gallery.PutGallery(user, fileId, data).then(data => { return data });
    }

    @Delete()
    async delete(@Query("fileIds") fileIds: string, @Body('user') user: sessionRequest){
        const filesId:string[] = fileIds.split(',');
        return this.gallery.DeleteGallery(user, filesId).then(data => { return data });
    }
}
