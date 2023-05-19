import sessionRespose, { galleryResponse, newResponse } from "./responses";

export default class UsersRequest{
    user:string;
    pass:string;
}

export class sessionRequest extends sessionRespose{}

export class galleryRequest extends galleryResponse{}

export class newRequest extends newResponse{}