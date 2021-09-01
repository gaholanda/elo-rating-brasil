import type { NextPage } from "next";
import { ListTeams } from "../components";
import { RatingType, TeamType } from "../types";

interface HomeProps {
  ratings: Array<RatingType>;
}

const Home: NextPage<HomeProps> = ({ ratings }) => {
  return (
    <div className="container">
      <h1 className="table-title">Nível 7</h1>
      <ListTeams ratings={ratings.filter((rating) => rating.level === 7)} />
      <h1 className="table-title">Nível 6</h1>
      <ListTeams ratings={ratings.filter((rating) => rating.level === 6)} />
      <h1 className="table-title">Nível 5</h1>
      <ListTeams ratings={ratings.filter((rating) => rating.level === 5)} />
      <h1 className="table-title">Nível 4</h1>
      <ListTeams ratings={ratings.filter((rating) => rating.level === 4)} />
      <h1 className="table-title">Nível 3</h1>
      <ListTeams ratings={ratings.filter((rating) => rating.level === 3)} />
      <h1 className="table-title">Nível 2</h1>
      <ListTeams ratings={ratings.filter((rating) => rating.level === 2)} />
      <h1 className="table-title">Nível 1</h1>
      <ListTeams ratings={ratings.filter((rating) => rating.level === 1)} />
      <div className="table-info">
        <p>
          <strong>Pos</strong>ição <strong>R</strong>ating <strong>J</strong>
          ogos
        </p>
        <p>Ratings atualizados até 31/08/2021</p>
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
