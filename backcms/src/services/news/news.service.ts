import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { newRequest, sessionRequest } from 'src/dto/requests';
import { newResponse } from 'src/dto/responses';

@Injectable()
export class NewsService {
    private url:string = 'src/asset/times/';

    constructor(private base:BaseService){}

    public async GetNews(user: sessionRequest, mapping:boolean = false):Promise<newResponse[]>{
        if(!this.base.VerifySession(user)){ return null; }
        const News = this.base.ReadFile('times').then(data => {
            if(mapping){
                data.forEach(element => {
                    element.pathImage = this.url + element.pathImage;
                });
            }
            return data;
        });
        return News;
    }

    public async GetNew(user:sessionRequest, id: string, mapping:boolean = false):Promise<newResponse> {
        const list = await this.GetNews(user).then(data => {
            if(mapping){
                data.forEach(element => {
                    element.pathImage = this.url + element.pathImage;
                });
            }
            return data;
        });
        const photo:any = list.find(item => item.id == id);
        return photo;
    }

    private async PostNews(user:sessionRequest, data:newRequest[]):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
          return this.base.WriteFile('times',data).then(data => { return data;} );
    }

    public async PatchNews(user:sessionRequest, data:newRequest):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        let list = await this.GetNews(user).then(data => { return data; });
        list.push(data);
        return await this.PostNews(user, list).then(data => {
            return data;
        });
    }

    public async PutNews(user:sessionRequest, id: string, data:newRequest):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        let list = await this.GetNews(user).then(data => { return data; });
        const index = this.base.FindElement(user, list, id);
        list[index].title = data.title;
        list[index].description = data.description;
        list[index].url = data.url;
        return await this.PostNews(user, list).then(data => {
            return data;
        });
    }

    public async DeleteNews(user:sessionRequest, ids: string[]):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        let list = await this.GetNews(user).then(data => { return data; });
        ids.forEach(item => {
            const index = this.base.FindElement(user, list, item);
            this.base.DeteleFile(this.url + list[index].pathImage); 
            list.splice(index,1);
        });
        if(list && list.length > 0){
            return this.PostNews(user, list).then(data => { return data; });
        }
    }
}
