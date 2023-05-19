import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { newRequest, sessionRequest } from 'src/dto/requests';
import { newResponse } from 'src/dto/responses';

@Injectable()
export class NewsService {

    constructor(private base:BaseService){}

    public async GetNews(user: sessionRequest):Promise<newResponse[]>{
        if(!this.base.VerifySession(user)){ return null; }
        const News = this.base.ReadFile('times').then(data => {
            return data;
        });
        return News;
    }

    public async GetNew(user:sessionRequest, id: string):Promise<newResponse> {
        const list = await this.GetNews(user).then(data => {
            return data;
        });
        const photo:any = list.find(item => item.id == id);
        return photo;
    }

    public async PostNews(user:sessionRequest, data:newRequest[]):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        data.forEach((item,index) => {
            item.id = (index + 1) + '';
        });
        return this.base.WriteFile('times',data).then(data => { return data;} );
    }

    public async PatchNews(user:sessionRequest, data:newRequest):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        let list = await this.GetNews(user).then(data => { return data; });
        list.push(data);
        return await this.PostNews(user, list);
    }

    public async PutNews(user:sessionRequest, id: string, description:string):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        let list = await this.GetNews(user).then(data => { return data; });
        const index = this.FindElement(user, list, id);
        list[index].description = description;
        return await this.PostNews(user, list).then(data => {
            return data;
        });
    }

    public async DeleteNews(user:sessionRequest, ids: string[]):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        let list = await this.GetNews(user).then(data => { return data; });
        ids.forEach(item => {
            const index = this.FindElement(user, list, item);
            list = list.splice(index,1);
        });
        return this.PostNews(user, list).then(data => { return data; });
    }

    private FindElement(user:sessionRequest, list:any, id:string):number{
        const index = list.findIndex((item,index) => {
            if(item.id == id) { return index; }
        });
        return index;
    }
}
