import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { UpdateChallengeStatus } from '../enums/challenge-status.enum';

export class UpdatePlayerDTO {
    @IsEnum(UpdateChallengeStatus)
    status: UpdateChallengeStatus;

    @IsNotEmpty()
    @IsDateString()
    challengeDateTime: Date;
}
