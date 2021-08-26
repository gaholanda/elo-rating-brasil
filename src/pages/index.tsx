import type { NextPage } from "next";
import { ListTeams } from "../components";

const Home: NextPage = () => {
  return (
    <div className="container">
      <ListTeams />
      <div className="until-date">
        <p>Resultados até 20/08/2021</p>
      </div>
    </div>
  );
};

export default Home;
