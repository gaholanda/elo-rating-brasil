import { NextPage } from "next";
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
  return (
    <div className="container">
      <div className="team">
        <div className="team--header">
          <h1 className="team--title">{team.name}</h1>
        </div>
        <div className="team--content">
          <div className="team--info">
            <div
              className="team--logo"
              style={{ backgroundImage: `url(/images/teams/${team.id}.png)` }}
            />
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
          <div className="team--chart"></div>
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

export async function getStaticProps({ params }: GetStaticProps) {
  const { id } = params;

  const CSV2JSON = require("convert-csv-to-json");
  const {
    RatingsData,
    TeamsData,
    TeamsRatingsFolder,
  } = require("../../../admin/config");

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
        history: getTeamHistory.sort((a, b) => b.timestamp - a.timestamp),
      },
    },
  };
}

export async function getStaticPaths() {
  const { TeamsPaths } = require("../../../admin/config");

  return {
    paths: TeamsPaths,
    fallback: true,
  };
}
