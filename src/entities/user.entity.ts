import { Entity, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { DeveloperRole, UserStatus } from "../enums";
import { TeamEntity } from "./team.entity";
import { AbstractEntity } from "./base/abstract.entity";

@Entity("user")
@Unique(["firstName", "lastName"])
export class UserEntity extends AbstractEntity {
  @Column({ name: "first_name", length: 100 })
  firstName: string;

  @Column({ name: "last_name", length: 100 })
  lastName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @ManyToOne(() => TeamEntity, (team) => team.users)
  @JoinColumn({ name: "team_id" })
  team: TeamEntity;

  @Column({
    type: "enum",
    enum: DeveloperRole,
  })
  role: DeveloperRole;

  @Column({
    type: "enum",
    enum: UserStatus,
  })
  status: UserStatus;
}
