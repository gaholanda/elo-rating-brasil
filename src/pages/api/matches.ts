import type { NextApiRequest, NextApiResponse } from "next";
import CSV2JSON from "convert-csv-to-json";
import { MatchType, TeamType, MessageErrorType } from "../../types";
import { MatchesFolder, TeamsData } from "../../../admin/config";

const Teams: Array<TeamType> = CSV2JSON.getJsonFromCsv(TeamsData);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<MatchType> | MessageErrorType>
) {
  const { query } = req;

  if (query.year) {
    try {
      const matches: Array<MatchType> = CSV2JSON.getJsonFromCsv(
        `${MatchesFolder}/br/${query.year}.csv`
      );
      const matchesWithTeamsNames = matches.map((match) => {
        const homeTeamName = Teams.filter(
          (team) => team.id === match.home_team_id
        )[0].name;

        const awayTeamName = Teams.filter(
          (team) => team.id === match.away_team_id
        )[0].name;

        return {
          ...match,
          home_team_name: homeTeamName,
          away_team_name: awayTeamName,
        };
      });

      res.status(200).json(matchesWithTeamsNames);
    } catch (erro) {
      res.status(404).json({ status: 404, message: "ano não encontrado" });
    }
  } else {
    res
      .status(500)
      .json({ status: 500, message: "informe o parâmetro 'year'" });
  }
}
