import type { NextPage } from "next";
import { ListTeams, Menu } from "../components";

const Home: NextPage = () => {
  return (
    <div className="container">
      <Menu />
      <ListTeams />
    </div>
  );
};

export default Home;
