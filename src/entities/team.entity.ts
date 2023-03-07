import { Entity, Column, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { AbstractEntity } from "./base/abstract.entity";

@Entity("team")
export class TeamEntity extends AbstractEntity {
  @Column({ length: 100, unique: true })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.team, {
    cascade: true,
    eager: true,
  })
  users?: UserEntity[];
}
