import type { NextApiRequest, NextApiResponse } from "next";
import CSV2JSON from "convert-csv-to-json";
import { TeamsData } from "../../../admin/config";
import { MessageErrorType, TeamType } from "../../types";

const Teams: Array<TeamType> = CSV2JSON.getJsonFromCsv(TeamsData);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<TeamType> | TeamType | MessageErrorType>
) {
  const { query } = req;

  if (query.id && query.id !== "") {
    const team = Teams.filter((team) => team.id === query.id)[0];

    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ status: 404, message: "time não encontrado" });
    }
  } else {
    res.status(200).json(Teams);
  }
}
