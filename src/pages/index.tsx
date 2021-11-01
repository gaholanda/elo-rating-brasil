import type { NextPage } from "next";
import { ListTeams } from "../components";
import { RatingType, TeamType } from "../types";

interface HomeProps {
  levels: number;
  ratings: Array<RatingType>;
}

const Home: NextPage<HomeProps> = ({ ratings, levels }) => {
  const _levels = Array.from({ length: levels }, (_, k) => levels - k);

  return (
    <div className="container">
      <div className="table-info">
        <p>Ratings atualizados até 31/10/2021</p>
      </div>
      {_levels.map((level) => (
        <ListTeams
          key={`level-${level}`}
          ratings={ratings.filter((rating) => rating.level === level)}
          level={level}
        />
      ))}
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const CSV2JSON = require("convert-csv-to-json");
  const {
    RatingsData,
    TeamsData,
    GetTeamLevel,
    TeamsLevels,
  } = require("../admin/config");

  const ratings: Array<RatingType> = CSV2JSON.getJsonFromCsv(RatingsData);
  const teams: Array<TeamType> = CSV2JSON.getJsonFromCsv(TeamsData);

  const GetTeamsRatings = ratings.map((rating) => {
    return {
      ...rating,
      name: teams.filter((team) => team.id === rating.id)[0].name,
      level: GetTeamLevel(parseInt(rating.matches)),
    };
  });

  return {
    props: {
      levels: Object.keys(TeamsLevels).length,
      ratings: GetTeamsRatings,
    },
  };
}
