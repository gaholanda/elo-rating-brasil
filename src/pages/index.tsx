import type { NextPage } from "next";
import { ListTeams } from "../components";
import { RatingType, TeamType } from "../types";

interface HomeProps {
  ratings: Array<RatingType>;
}

const Home: NextPage<HomeProps> = ({ ratings }) => {
  return (
    <div className="container">
      <ListTeams ratings={ratings} />
      <div className="table-info">
        <p>
          <strong>Pos</strong> Posição, <strong>R</strong> Rating,{" "}
          <strong>J</strong> Jogos
        </p>
        <p>Ratings atualizados até 31/08/2021</p>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const CSV2JSON = require("convert-csv-to-json");
  const { RatingsData, TeamsData } = require("../admin/config");

  const ratings: Array<RatingType> = CSV2JSON.getJsonFromCsv(RatingsData);
  const teams: Array<TeamType> = CSV2JSON.getJsonFromCsv(TeamsData);

  const GetTeamsRatings = ratings.map((rating) => {
    return {
      ...rating,
      name: teams.filter((team) => team.id === rating.id)[0].name,
    };
  });

  return {
    props: {
      ratings: GetTeamsRatings,
    },
  };
}
