import { NextPage } from "next";
import Link from "next/link";
import { Line } from "react-chartjs-2";

import { RatingType, TeamHistoryType, TeamType } from "../../types";

interface TeamProps {
  team: {
    id: string;
    name: string;
    rating: RatingType;
    history: Array<TeamHistoryType>;
  };
}

const Team: NextPage<TeamProps> = ({ team }) => {
  const { history } = team;

  const labels = Array.from(
    { length: history.length },
    (v, k) =>
      `${history[k].team_goals}x${history[k].opp_team_goals} ${history[k].opp_team_id}`
  );

  const chartData = Array.from(
    { length: history.length },
    (v, k) => history[k].team_Rn
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Rating",
        data: chartData,
        fill: false,
        backgroundColor: "#009c3b",
        borderColor: "#ffdf00",
      },
    ],
  };

  return (
    <div className="container">
      <div className="button-back">
        <Link href="/teams">
          <button>Voltar</button>
        </Link>
      </div>
      <div className="team">
        <div className="team--header">
          <h1 className="team--title">{team.name}</h1>
        </div>
        <div className="team--content">
          <div className="team--info">
            <div className={`team--logo bg-team bg-team-${team.id}`} />
            <div className="team--stats">
              <div className="team--stats-data">
                <span>Jogos</span>
                <span>{team.rating.matches}</span>
              </div>
              <div className="team--stats-data">
                <span>Vitórias</span>
                <span>{team.rating.wins}</span>
              </div>
              <div className="team--stats-data">
                <span>Empates</span>
                <span>{team.rating.draws}</span>
              </div>
              <div className="team--stats-data">
                <span>Derrotas</span>
                <span>{team.rating.losses}</span>
              </div>
            </div>
          </div>
          <div className="team--chart">
            <h3 className="team--chart-title">Últimos jogos</h3>
            <Line data={data} width={400} height={400} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

interface GetStaticProps {
  params: { id: string };
  locales?: undefined;
  locale?: undefined;
  defaultLocale?: undefined;
}

export async function getStaticPaths() {
  const { TeamsPaths } = require("../../admin/config");

  return {
    paths: TeamsPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticProps) {
  const { id } = params;

  const CSV2JSON = require("convert-csv-to-json");
  const {
    RatingsData,
    TeamsData,
    TeamsRatingsFolder,
  } = require("../../admin/config");

  const allTeams: Array<TeamType> = CSV2JSON.getJsonFromCsv(TeamsData);
  const allRatings: Array<RatingType> = CSV2JSON.getJsonFromCsv(RatingsData);

  const getTeam: TeamType = allTeams.filter(
    (team: TeamType) => team.id === id
  )[0];
  const getTeamRating: RatingType = allRatings.filter(
    (rating: RatingType) => rating.id === id
  )[0];

  const teamHistory: Array<TeamHistoryType> = CSV2JSON.getJsonFromCsv(
    `${TeamsRatingsFolder}/${id}.csv`
  );

  const getTeamHistory = teamHistory.map((rating: TeamHistoryType) => {
    const date = rating.date.split("/");
    const timestamp = new Date(`${date[2]}/${date[1]}/${date[0]}`).getTime();

    return {
      ...rating,
      team_Rn: parseInt(rating.team_Rn),
      team_name: getTeam.name,
      opp_team_name: allTeams.filter(
        (team) => team.id === rating.opp_team_id
      )[0].name,
      timestamp: timestamp,
    };
  });

  return {
    props: {
      team: {
        id: getTeam.id,
        name: getTeam.name,
        rating: getTeamRating,
        history: getTeamHistory.slice(
          getTeamHistory.length - 6,
          getTeamHistory.length
        ),
      },
    },
  };
}
