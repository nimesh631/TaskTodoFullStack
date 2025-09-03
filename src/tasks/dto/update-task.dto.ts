import { IsBoolean, IsOptional, IsString, isString, MinLength } from "class-validator";

export class UpdateTaskDto {
   @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}