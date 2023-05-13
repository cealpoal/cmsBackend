import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { galleryResponse } from 'src/dto/responses';
import UsersRequest, { galleryRequest, sessionRequest } from 'src/dto/requests';

@Injectable()
export class GalleryService {

    constructor(private base:BaseService){}

    
    public async GetGallery(user: sessionRequest):Promise<galleryResponse[]>{
        if(!this.base.VerifySession(user)){ return null; }
        const gallery = this.base.ReadFile('picasso').then(data => {
            return data;
        });
        return gallery;
    }

    public async GetPhoto(user:sessionRequest, id: string):Promise<galleryResponse> {
        const list = await this.GetGallery(user).then(data => {
            return data;
        });
        const photo:any = list.find(item => item.id == id);
        return photo;
    }

    public async PostGallery(user:sessionRequest, data:galleryRequest[]):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        data.forEach((item,index) => {
            item.id = (index + 1) + '';
        });
        return this.base.WriteFile('picasso',data).then(data => { return data;} );
    }

    public async PatchGallery(user:sessionRequest, data:galleryRequest):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        let list = await this.GetGallery(user).then(data => { return data; });
        list.push(data);
        return await this.PostGallery(user, list);
    }

    public async PutGallery(user:sessionRequest, id: string, description:string):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        let list = await this.GetGallery(user).then(data => { return data; });
        const index = this.FindElement(user, list, id);
        list[index].description = description;
        return await this.PostGallery(user, list).then(data => {
            return data;
        });
    }

    public async DeleteGallery(user:sessionRequest, ids: string[]):Promise<boolean>{
        if(!this.base.VerifySession(user)){ return null; }
        let list = await this.GetGallery(user).then(data => { return data; });
        ids.forEach(item => {
            const index = this.FindElement(user, list, item);
            list = list.splice(index,1);
        });
        return this.PostGallery(user, list).then(data => { return data; });
    }

    private FindElement(user:sessionRequest, list:any, id:string):number{
        const index = list.findIndex((item,index) => {
            if(item.id == id) { return index; }
        });
        return index;
    }
}
