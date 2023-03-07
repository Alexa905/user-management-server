import { TeamService } from "../services";
import { PaginationQueryDto, UserUUIDParams } from "../dto";
import {
  JsonController,
  QueryParams,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  OnUndefined,
  NotFoundError,
} from "routing-controllers";
import { TeamDto } from "../dto";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

@JsonController("/teams")
export class TeamController {
  constructor(private teamService: TeamService) {
    this.teamService = new TeamService();
  }

  @Get("/")
  @OpenAPI({ summary: "Return teams" })
  @ResponseSchema(TeamDto, { isArray: true })
  getAll(@QueryParams() query: PaginationQueryDto) {
    return this.teamService.getAllTeams(query);
  }

  @Post()
  post(@Body() team: TeamDto) {
    return this.teamService.createTeam(team);
  }

  @Delete("/:teamId")
  remove(@Param("teamId") teamId: string) {
    return this.teamService.deleteTeam(teamId);
  }
}
