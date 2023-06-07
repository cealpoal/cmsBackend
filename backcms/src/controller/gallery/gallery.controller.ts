import { Body, Controller, Delete, Get, Param, Post, Patch, Put, Query, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
        return this.gallery.GetGallery(userSer, true).then(data => { return data });
    }

    @Get(':fileId')
    async getPhoto(@Param("fileId") fileId:string, @Headers("user") user: string){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.gallery.GetPhoto(userSer, fileId, true).then(data => { return data });
    }

    @Post()
    @UseInterceptors(
        FileInterceptor(
            'file', {
            storage: diskStorage({
                destination: "./src/asset/picasso",
                filename: function(req, file, cb){
                    cb(null, 'gal' + Date.now() + '.' + file.mimetype.substring(file.mimetype.length-3));
                }
            })
        })
    )
    async post(@Headers("user") user: string, @Headers("description") description:string, @UploadedFile() file:Express.Multer.File){
        const userSer:sessionRequest = this.common.Deserilized(user);
        const ext:string = '.' + file.mimetype.substring(file.mimetype.length-3);
        const request: galleryRequest = {
            description: description,
            id: file.filename.replace('gal','').replace(ext,''),
            path: file.filename
        }
        return this.gallery.PatchGallery(userSer, request).then(data => { return data });
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
