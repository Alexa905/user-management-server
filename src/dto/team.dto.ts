import { IsNotEmpty, MaxLength } from "class-validator";

export class TeamDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
