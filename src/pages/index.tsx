import type { NextPage } from "next";
import { Fragment } from "react";
import { ListTeams } from "../components";
import { RatingType, TeamType } from "../types";

interface HomeProps {
  ratings: Array<RatingType>;
}

const Home: NextPage<HomeProps> = ({ ratings }) => {
  const levels = [7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="container">
      {levels.map((level) => (
        <ListTeams
          key={`level-${level}`}
          ratings={ratings.filter((rating) => rating.level === level)}
          level={level}
        />
      ))}
      <div className="table-info">
        <p>
          <strong>Pos</strong>ição <strong>R</strong>ating <strong>J</strong>
          ogos
        </p>
        <p>Ratings atualizados até 13/09/2021</p>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const CSV2JSON = require("convert-csv-to-json");
  const { RatingsData, TeamsData, GetTeamLevel } = require("../admin/config");

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
      ratings: GetTeamsRatings,
    },
  };
}
