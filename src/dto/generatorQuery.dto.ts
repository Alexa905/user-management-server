import { IsIn, IsOptional, IsUUID } from "class-validator";
import { DeveloperRole, SortOptions } from "../enums";

export class GeneratorQueryDto {
  @IsOptional()
  @IsIn(Object.values(DeveloperRole))
  role: DeveloperRole;

  @IsOptional()
  @IsIn(Object.values(SortOptions))
  sort: SortOptions;

  @IsOptional()
  @IsUUID()
  speaker: string;
}
