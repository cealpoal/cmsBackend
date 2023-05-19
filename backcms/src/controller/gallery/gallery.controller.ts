import { Body, Controller, Delete, Get, Param, Post, Patch, Put, Query, Headers } from '@nestjs/common';
import { galleryRequest, sessionRequest } from 'src/dto/requests';
import { CommonsService } from 'src/services/commons/commons.service';
import { GalleryService } from 'src/services/gallery/gallery.service';

@Controller('gallery')
export class GalleryController {
    constructor(private gallery:GalleryService,
        private common:CommonsService){}

    @Get()
    async get(@Headers("user") user: string){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.gallery.GetGallery(userSer).then(data => { return data });
    }

    @Get(':fileId')
    async getPhoto(@Param("fileId") fileId:string, @Headers("user") user: string){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.gallery.GetPhoto(userSer, fileId).then(data => { return data });
    }

    @Post()
    async post(@Headers("user") user: string,@Body('data') data: galleryRequest[]){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.gallery.PostGallery(userSer, data).then(data => { return data });
    }

    @Patch()
    async patch(@Headers("user") user: string, @Body('data') data: galleryRequest){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.gallery.PatchGallery(userSer, data).then(data => { return data });
    }


    @Put(':fileId')
    async put(@Param("fileId") fileId:string, @Headers("user") user: string, @Body('data') data ){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.gallery.PutGallery(userSer, fileId, data).then(data => { return data });
    }

    @Delete()
    async delete(@Query("fileIds") fileIds: string, @Headers("user") user: string){
        const userSer:sessionRequest = this.common.Deserilized(user);
        const filesId:string[] = fileIds.split(',');
        return this.gallery.DeleteGallery(userSer, filesId).then(data => { return data });
    }
}
