import { Injectable } from '@nestjs/common';
import {
    ClientProxy,
    ClientProxyFactory,
    Transport,
} from '@nestjs/microservices';
import { CreateCategoryDTO } from '../dtos/create-category.dto';

@Injectable()
export class AdminService {
    private clientAdminBackend: ClientProxy;

    private ADMIN_SERVICE_QUEUE = 'admin-backend';

    constructor() {
        this.clientAdminBackend = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.SMARTRANKING_MQ_URL],
                queue: this.ADMIN_SERVICE_QUEUE,
            },
        });
    }

    public async createCategory(categoryData: CreateCategoryDTO) {
        return this.clientAdminBackend.emit('create-category', categoryData);
    }
}
