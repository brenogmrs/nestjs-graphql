import { Controller, Post } from '@nestjs/common';

@Controller('api/v1/players')
export class PlayersController {
    @Post()
    async createOrUpdatePlayer() {
        return JSON.stringify({
            name: 'name',
        });
    }
}
