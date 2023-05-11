import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import UsersRequest, { galleryRequest, sessionRequest } from 'src/dto/requests';
import sessionRespose, { galleryResponse } from 'src/dto/responses';
import Users from 'src/dto/domains';

const moment = require("moment");

@Injectable()
export class MerlinService {
    constructor(private base:BaseService){}
    
    //Autorizaciòn de sesiòn de usuario
    public async Gateway(params:UsersRequest):Promise<sessionRespose> {
        const sessionNow = this.base.ReadFile('kabuto').then(data => {
            if(data.admin.User == params.user && data.admin.Password == params.pass){
                return {
                    user: data.admin.Name,
                    dateInit: moment().format(),
                    dateEnd: moment().add(1,'h').format()
                }
            }
            return null;
        });
        return sessionNow;
    }

}

