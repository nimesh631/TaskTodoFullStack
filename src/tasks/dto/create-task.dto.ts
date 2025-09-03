import { IsString, MinLength, minLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MinLength(1)
    title: string;
}