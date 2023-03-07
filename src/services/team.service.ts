import { AppDataSource } from "../config/dataSource.config";
import { TeamEntity } from "../entities";
import { Repository } from "typeorm";
import { NotFoundError } from "routing-controllers";
import { PaginationQueryDto } from "../dto";
import { formatTeam, formatTeams } from "../utils/formatTeam";

export class TeamService {
  private teamRepository: Repository<TeamEntity>;

  constructor() {
    this.teamRepository = AppDataSource.getRepository(TeamEntity);
  }

  public getAllTeams = async ({ limit = 10, page = 1 }) => {
    const take = limit || 10;
    const skip = page === 1 ? 0 : limit * (page - 1);
    const [items, count] = await this.teamRepository.findAndCount({
      order: {
        id: "DESC",
      },
      skip,
      take,
    });
    return {
      allCount: count,
      count: items?.length || 0,
      page: Number(page),
      items: formatTeams(items),
    };
  };

  public getTeam = async (teamId: string) => {
    const team = await this.teamRepository.findOneById(teamId);
    if (!team) throw new NotFoundError(`Team was not found.`);
    return formatTeam(team);
  };

  public createTeam = async (team: TeamEntity) => {
    const newTeam = await this.teamRepository.save(team);
    return newTeam;
  };

  public deleteTeam = async (id: string) => {
    const deletedTeam = await this.teamRepository.delete(id);
    return deletedTeam;
  };
}
