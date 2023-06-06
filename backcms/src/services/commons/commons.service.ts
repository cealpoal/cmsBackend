import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonsService {
    constructor(){}

    Deserilized(origin:string):any{
        //return JSON.parse(origin);
        return origin;
    }

}
