import sessionRespose, { galleryResponse } from "./responses";

export default class UsersRequest{
    user:string;
    pass:string;
}

export class sessionRequest extends sessionRespose{}

export class galleryRequest extends galleryResponse{}