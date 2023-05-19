import { Body, Controller, Delete, Get, Param, Post, Patch, Put, Query, Headers } from '@nestjs/common';
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
        return this.news.GetNews(userSer).then(data => { return data });
    }

    @Get(':fileId')
    async getNew(@Param("fileId") fileId:string, @Headers("user") user: string){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.news.GetNew(userSer, fileId).then(data => { return data });
    }

    @Post()
    async post(@Headers("user") user: string,@Body('data') data: newRequest[]){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.news.PostNews(userSer, data).then(data => { return data });
    }

    @Patch()
    async patch(@Headers("user") user: string, @Body('data') data: newRequest){
        const userSer:sessionRequest = this.common.Deserilized(user);
        return this.news.PatchNews(userSer, data).then(data => { return data });
    }


    @Put(':fileId')
    async put(@Param("fileId") fileId:string, @Headers("user") user: string, @Body('data') data ){
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
