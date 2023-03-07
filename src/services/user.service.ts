import { AppDataSource } from "../config/dataSource.config";
import { UserEntity } from "../entities";
import { Not, Repository } from "typeorm";
import { NotFoundError } from "routing-controllers";
import {
  GeneratorQueryDto,
  PaginationQueryDto,
  UserDto,
  UserUpdateDto,
} from "../dto";
import { TeamService } from "./team.service";
import { formatUser, formatUserInput, formatUsers } from "../utils/formatUsers";
import { DeveloperRole, SortOptions, UserStatus } from "../enums";

export class UserService {
  private userRepository: Repository<UserEntity>;
  private teamService: TeamService;
  private logger: any;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
    this.teamService = new TeamService();
    this.logger = console.log;
  }

  public getAllUsers = async ({ limit = 10, page = 1 }: PaginationQueryDto) => {
    const take = limit || 10;
    const skip = page === 1 ? 0 : limit * (page - 1);
    const [items, count] = await this.userRepository.findAndCount({
      order: {
        firstName: "ASC",
      },
      skip,
      take,
      relations: {
        team: true,
      },
    });
    return {
      allCount: count,
      count: items?.length || 0,
      page: Number(page),
      items: formatUsers(items),
    };
  };

  public generateList = async ({ role, speaker, sort }: GeneratorQueryDto) => {
    const order =
      sort === SortOptions.ALPHABETICAL ? "u.firstName" : "RANDOM()";
    const randomUsers = await this.userRepository
      .createQueryBuilder("u")
      .select(["u.id", "u.firstName", "u.lastName"])
      //.where("u.status = :status", { status: Not('temporary unavailable')})
      .where(role ? `role = :role` : "1=1", { role })
      .orderBy(order)
      .getMany();
    if (speaker) {
      const speakerIndex = randomUsers.findIndex((user) => user.id === speaker);
      // @ts-ignore
      randomUsers[speakerIndex].isSpeaker = true;
    } else {
      const randomIndex = Math.floor(Math.random() * randomUsers.length);
      // @ts-ignore
      randomUsers[randomIndex].isSpeaker = true;
    }

    return randomUsers;
  };

  public getUser = async (userId: string) => {
    const user = await this.userRepository.findOneById(userId);
    if (!user) throw new NotFoundError(`User was not found.`);
    return formatUser(user);
  };

  public createUser = async (user: UserDto) => {
    this.logger("CREATE USER", user);
    const team = await this.teamService.getTeam(user.teamId);
    if (!team) {
      throw new NotFoundError(`Team with id ${user.teamId} was not found.`);
    }
    const newUser = await this.userRepository.save({ ...user, team });
    return formatUser(newUser);
  };

  public updateUser = async (user: UserUpdateDto, id: string) => {
    try {
      if (user.teamId) {
        const team = await this.teamService.getTeam(user.teamId);
        if (!team) {
          throw new NotFoundError(`Team with id ${user.teamId} was not found.`);
        }
      }

      const { affected } = await this.userRepository.update(
        id,
        formatUserInput(user)
      );
      if (affected! > 0) return "OK";
    } catch (e) {
      console.error(e);
    }
  };

  public deleteUser = async (id: string) => {
    const deletedUser = await this.userRepository.delete(id);
    return deletedUser;
  };
}
