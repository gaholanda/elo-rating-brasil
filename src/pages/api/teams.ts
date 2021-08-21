// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import CSV2JSON from "convert-csv-to-json";
import { TeamsData } from "../../../admin/config";

type Team = {
  id: string;
  name: string;
};

type MessageError = {
  status: number;
  message: string;
};

const Teams: Array<Team> = CSV2JSON.getJsonFromCsv(TeamsData);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Team> | Team | MessageError>
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
