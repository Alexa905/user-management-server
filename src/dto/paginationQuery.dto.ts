import { IsPositive, IsOptional, IsIn } from "class-validator";
import { UserStatus } from "../enums";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  page: number;
}
