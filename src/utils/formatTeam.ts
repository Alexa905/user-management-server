import { TeamEntity } from "../entities";

export const formatTeam = (team: TeamEntity) => ({
  id: team.id,
  name: team.name,
});
export const formatTeams = (teams: TeamEntity[]) => teams.map(formatTeam);
