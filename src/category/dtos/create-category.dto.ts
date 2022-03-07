import { ArrayMinSize, IsArray, IsEmpty, IsString } from 'class-validator';
import { Event } from '../interfaces/category.interface';

export class CreateCategoryDTO {
    @IsString()
    @IsEmpty()
    readonly category: string;

    @IsString()
    @IsEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    events: Array<Event>;
}
