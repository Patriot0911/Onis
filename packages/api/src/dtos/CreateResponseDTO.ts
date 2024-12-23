import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { AnswerDTO } from './ResponseDTO';

export class CreateResponseDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDTO)
  answers: AnswerDTO[];
}
