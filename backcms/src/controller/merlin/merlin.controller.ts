import { Body, Controller, Get, Headers } from '@nestjs/common';
import UsersRequest from 'src/dto/requests';
import { CommonsService } from 'src/services/commons/commons.service';
import { MerlinService } from 'src/services/merlin/merlin.service';

@Controller('merlin')
export class MerlinController {

    constructor(private merlin:MerlinService,
        private common:CommonsService){}

    @Get('gateway')
    async boo(@Headers("data") data:string) {
        const dataSer:UsersRequest = this.common.Deserilized(data);
        return this.merlin.Gateway(dataSer).then(data => {
            return data;
        });
    }
}
