import type { NextPage } from "next";
import { ListTeams } from "../components";

const Home: NextPage = () => {
  return (
    <div className="container">
      <ListTeams />
    </div>
  );
};

export default Home;
