import { Body, Controller, Get } from '@nestjs/common';
import UsersRequest from 'src/dto/requests';
import { MerlinService } from 'src/services/merlin/merlin.service';

@Controller('merlin')
export class MerlinController {

    constructor(private merlin:MerlinService){}

    @Get('gateway')
    async boo(@Body() data:UsersRequest) {
        return this.merlin.Gateway(data).then(data => {
            return data;
        });
    }
}
