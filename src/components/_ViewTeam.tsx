import { useEffect, useState } from "react";
import { TeamHistoryType } from "../types";

interface ViewTeamProps {
  id: string | boolean;
}

export const ViewTeam: React.FC<ViewTeamProps> = ({ id }) => {
  const [team, setTeam] = useState<Array<TeamHistoryType>>([]);

  useEffect(() => {
    fetch(`/api/ratings?id=${id}`).then((response) =>
      response.json().then((data) => setTeam(data))
    );
  }, []);

  return (
    <div className="view-team--content">
      <div className="view-team--header">
        <p>{team.length > 0 && team[0].team_name}</p>
      </div>
      <div className="view-team--body"></div>
    </div>
  );
};
