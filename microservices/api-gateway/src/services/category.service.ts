import { Injectable } from '@nestjs/common';
import {
    ClientProxy,
    ClientProxyFactory,
    Transport,
} from '@nestjs/microservices';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';

@Injectable()
export class CategoryService {
    private clientAdminBackend: ClientProxy;

    constructor() {
        this.clientAdminBackend = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.SMARTRANKING_MQ_URL],
                queue: process.env.ADMIN_SERVICE_QUEUE,
            },
        });
    }

    public createCategory(categoryData: CreateCategoryDTO) {
        return this.clientAdminBackend.emit('create-category', categoryData);
    }

    public findCategories(categoryId?: string) {
        return this.clientAdminBackend.send(
            'get-categories',
            categoryId ? categoryId : '',
        );
    }

    public update(id: string, updateData: UpdateCategoryDTO) {
        return this.clientAdminBackend.emit('update-category', {
            id,
            category: updateData,
        });
    }
}
