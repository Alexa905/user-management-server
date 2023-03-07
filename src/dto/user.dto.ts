import { IsEmail, IsNotEmpty, IsIn, IsUUID, MaxLength } from "class-validator";
import { DeveloperRole, UserStatus } from "../enums";
export class UserDto {
  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(100)
  lastName?: string;

  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsIn(Object.values(UserStatus))
  status: UserStatus;

  @IsNotEmpty()
  @IsIn(Object.values(DeveloperRole))
  role: DeveloperRole;

  @IsUUID()
  @IsNotEmpty()
  teamId: string;
}

export class UserUpdateDto extends UserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  teamName: string;
}
