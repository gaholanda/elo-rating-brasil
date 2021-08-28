import type { NextApiRequest, NextApiResponse } from "next";
import CSV2JSON from "convert-csv-to-json";
import { RatingsData, TeamsData, TeamsRatingsFolder } from "../../admin/config";
import {
  MessageErrorType,
  RatingType,
  TeamType,
  TeamHistoryType,
} from "../../types";

const ratings: Array<RatingType> = CSV2JSON.getJsonFromCsv(RatingsData);
const teams: Array<TeamType> = CSV2JSON.getJsonFromCsv(TeamsData);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Array<RatingType> | Array<TeamHistoryType> | MessageErrorType
  >
) {
  const { query } = req;

  if (query.id && query.id !== "") {
    const teamHistory: Array<TeamHistoryType> = CSV2JSON.getJsonFromCsv(
      `${TeamsRatingsFolder}/${query.id}.csv`
    );

    if (teamHistory) {
      const GetTeamsHistory = teamHistory.map((rating) => {
        const date = rating.date.split("/");
        const timestamp = new Date(
          `${date[2]}/${date[1]}/${date[0]}`
        ).getTime();

        return {
          ...rating,
          team_name: teams.filter((team) => team.id === rating.team_id)[0].name,
          opp_team_name: teams.filter(
            (team) => team.id === rating.opp_team_id
          )[0].name,
          timestamp: timestamp,
        };
      });
      res
        .status(200)
        .json(GetTeamsHistory.sort((a, b) => b.timestamp - a.timestamp));
    } else {
      res.status(404).json({ status: 404, message: "time não encontrado" });
    }
  } else {
    const GetTeamsRatings = ratings.map((rating) => {
      return {
        ...rating,
        name: teams.filter((team) => team.id === rating.id)[0].name,
      };
    });
    res.status(200).json(GetTeamsRatings);
  }
}
