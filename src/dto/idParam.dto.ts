import { IsNotEmpty, IsUUID } from "class-validator";

export class UserUUIDParams {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
