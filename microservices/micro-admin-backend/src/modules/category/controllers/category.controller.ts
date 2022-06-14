import { Controller, Logger } from '@nestjs/common';
import {
    Ctx,
    EventPattern,
    MessagePattern,
    Payload,
    RmqContext,
} from '@nestjs/microservices';
import { ACK_ERRORS } from '../../common/helpers/errors/constants';
import {
    CategoryInterface,
    CategoryUpdateInterface,
} from '../interfaces/category.interface';
import { CategoryService } from '../services/category.service';

@Controller()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    private readonly logger = new Logger(CategoryController.name);

    @EventPattern('create-category')
    public async createCategory(
        @Payload() categoryData: CategoryInterface,
        @Ctx() context: RmqContext,
    ) {
        this.logger.log(
            `message received at topic:create-category: ${JSON.stringify(
                categoryData,
            )}`,
        );

        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();

        try {
            await this.categoryService.create(categoryData);
            await channel.ack(originalMessage);
        } catch ({ message }) {
            this.logger.error(`ERROR: ${JSON.stringify(message)}`);

            const filterAckError = ACK_ERRORS.filter((ackError) =>
                message.includes(ackError),
            );

            if (filterAckError) {
                await channel.ack(filterAckError);
            }
        }
    }

    @MessagePattern('get-categories')
    public async getAllCategories(
        @Ctx() context: RmqContext,
        @Payload() categoryId?: string,
    ) {
        this.logger.log(
            `message received at topic:get-categories with ID: ${categoryId}`,
        );

        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();

        try {
            if (categoryId) {
                return this.categoryService.getCategoryById(categoryId);
            }

            return this.categoryService.getAllCategories();
        } finally {
            await channel.ack(originalMessage);
        }
    }

    @EventPattern('update-category')
    public async updateCategory(
        @Payload() { id, category }: CategoryUpdateInterface,
        @Ctx() context: RmqContext,
    ) {
        this.logger.log(`message received at topic:update-categories`);

        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            await this.categoryService.update(id, category);
            await channel.ack(originalMessage);
        } catch ({ message }) {
            this.logger.error(`ERROR: ${JSON.stringify(message)}`);

            const filterAckError = ACK_ERRORS.filter((ackError) =>
                message.includes(ackError),
            );

            if (filterAckError) {
                await channel.ack(filterAckError);
            }
        }
    }
}
