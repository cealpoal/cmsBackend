export default class sessionRespose{
    user:string;
    dateInit:string;
    dateEnd:string;
}

export class galleryResponse{
    path:string;
    id:string;
    description:string;
    inscription:Date;
}

export class newResponse{
    id:string;
    pathImage:string;
    title:string;
    description:string;
    inscription:Date;
    url:string;
}