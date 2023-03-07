import { UserEntity } from "../entities";
import { UserDto, UserUpdateDto } from "../dto";

export const formatUser = (user: UserEntity): UserUpdateDto => {
  const {
    firstName,
    lastName,
    status,
    id,
    email,
    role,
    team: { name: teamName, id: teamId },
  } = user;
  return <UserUpdateDto>{
    firstName,
    lastName,
    status,
    id,
    email,
    role,
    teamId,
    teamName,
  };
};

export const formatUsers = (users: UserEntity[]) => users.map(formatUser);

export const formatUserInput = (user: UserDto) => {
  const { firstName, lastName, email, status, role } = user;
  return {
    ...{ firstName, lastName, email, status, role },
    team: { id: user.teamId },
  };
};
