import { NextPage } from "next";
import Link from "next/link";
import { TeamType } from "../types";

interface MatchesProps {
  teams: Array<TeamType>;
}

const Teams: NextPage<MatchesProps> = ({ teams }) => {
  return (
    <div className="container">
      <div className="button-back">
        <Link href="/">
          <button>Voltar</button>
        </Link>
      </div>
      <div className="teams">
        {!!teams && (
          <>
            <div className="teams--header">
              <h3 className="teams--header-title">Escolha o time</h3>
            </div>
            <div className="teams--list">
              {teams.map(({ id, name }) => (
                <Link key={`team-${id}`} href={`/team/${id}`}>
                  <div
                    className={`teams--team-info bg-team bg-team-${id}`}
                    title={name}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Teams;

export async function getStaticProps() {
  const CSV2JSON = require("convert-csv-to-json");
  const { TeamsData } = require("../admin/config");

  const teams: Array<TeamType> = CSV2JSON.getJsonFromCsv(TeamsData);

  return {
    props: {
      teams: teams,
    },
  };
}
