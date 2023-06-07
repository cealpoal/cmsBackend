import { Body, Controller, Delete, Get, Param, Post, Patch, Put, Query, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { newRequest, sessionRequest } from 'src/dto/requests';
import { CommonsService } from 'src/services/commons/commons.service';
import { NewsService } from 'src/services/news/news.service';

@Controller('news')
export class NewsController {
    constructor(private news:NewsService,
        private common:CommonsService){}

    @Get()
    async get(@Headers("user") user: string){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.news.GetNews(userSer, true).then(data => { return data });
    }

    @Get(':fileId')
    async getNew(@Param("fileId") fileId:string, @Headers("user") user: string){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.news.GetNew(userSer, fileId, true).then(data => { return data });
    }

    @Post()
    @UseInterceptors(
        FileInterceptor(
            'file', {
            storage: diskStorage({
                destination: "./src/asset/times",
                filename: function(req, file, cb){
                    cb(null, 'tim' + Date.now() + '.' + file.mimetype.substring(file.mimetype.length-3));
                }
            })
        })
    )
    async post(@Headers("user") user: string, @Headers('data') data: string, @UploadedFile() file:Express.Multer.File){
        const userSer:sessionRequest = this.common.Deserilized(user);
        let dataSet:newRequest = this.common.Deserilized(data);
        const ext:string = '.' + file.mimetype.substring(file.mimetype.length-3);
        dataSet.id = file.filename.replace('tim','').replace(ext,''),
        dataSet.pathImage = file.filename;
        
        return this.news.PatchNews(userSer, dataSet).then(data => { return data });
    }

    @Put(':fileId')
    async put(@Param("fileId") fileId:string, @Headers("user") user: string, @Body('data') data:newRequest ){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.news.PutNews(userSer, fileId, data).then(data => { return data });
    }

    @Delete()
    async delete(@Query("fileIds") fileIds: string, @Headers("user") user: string){
        const userSer:sessionRequest = this.common.Deserilized(user);
        const filesId:string[] = fileIds.split(',');
        return this.news.DeleteNews(userSer, filesId).then(data => { return data });
    }
}
