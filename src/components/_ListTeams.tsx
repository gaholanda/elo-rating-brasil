import { Fragment } from "react";

export const ListTeams: React.FC = () => {
  return (
    <div className="list-teams">
      <div className="list-teams--header">
        <p>Ratings e resultados até 20/08/2021</p>
        <div className="list-teams--titles">
          <p className="list-teams--titles-pos">Pos</p>
          <p className="list-teams--titles-name">Time</p>
          <p className="list-teams--titles-rate">Rating</p>
          <p className="list-teams--titles-diff">+/-</p>
        </div>
      </div>
      <div className="list-teams--ratings">
        {Array.from({ length: 10 }, () => "").map((_, i) => (
          <Fragment key={i}>
            <div className="list-teams--team">
              <p className="list-teams--team-pos">{i + 1}</p>
              <p className="list-teams--team-name">Team Name</p>
              <p className="list-teams--team-rate">1900</p>
              <p className="list-teams--team-diff">+12</p>
            </div>
            <div className="list-teams--separator"></div>
          </Fragment>
        ))}
        <div className="list-teams--team">
          <p className="list-teams--team-pos">11</p>
          <p className="list-teams--team-name">Team Name</p>
          <p className="list-teams--team-rate">90</p>
          <p className="list-teams--team-diff">+12</p>
        </div>
      </div>
    </div>
  );
};
