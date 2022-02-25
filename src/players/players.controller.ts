import { Controller, Post } from '@nestjs/common';

@Controller('v1/players')
export class PlayersController {
    @Post()
    async createOrUpdatePlayer() {
        return JSON.stringify({
            name: 'name',
        });
    }
}
